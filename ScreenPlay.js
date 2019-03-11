import React from 'react'
import { StyleSheet, View, Alert, StatusBar, SafeAreaView } from 'react-native'
import { KeepAwake } from 'expo'
import { secInMinutes } from './utils'
import { i18n } from './strings'
import styles from './styles'
import ImageSources  from './ImageSources'
import GymnasticElement from './view/GymnasticElement'
import GameControlBoard from './view/GameControlBoard'
import Game from './Game'  
import ModalView from './view/ModalView'
import ModalTeamInput from './view/ModalTeamInput'
import Countdown from './view/Countdown'
import ModalButton from './view/ModalButton'
import LocalStorage from './LocalStorage'
import GameHistory from './GameHistory'
import ModalTimeSet from './view/ModalTimeSet'
import { roundedCorner } from './styles/base'

gameDuration = 240 // 4 minutes
const FIRST_TEAM = 1 // To identify if the first team is playing
const SECOND_TEAM = 2 // To identify if the second team is playing

export default class PlayScreen extends React.Component {
    static navigationOptions = {
        title: i18n.t("luckyPig"),
    }

    constructor (props){
        super(props) 
        this.state = { 
            current: 0, 
            total: 0,
            teamOneName: "",
            teamTwoName: "",
            gameStarted: false,
            gamePaused: false,
            gameStopped: false,
            teamInputVisible: true, // when the game starts they team names have to be
            onCountdownPressed: false, // if true the "change game time" modal will be shown if the game isn't started yet
        }  

        this.game = new Game()

        // The first team entered always starts the game 
        this.playingTeam = FIRST_TEAM

        this.onDelete = this.onDelete.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onElementClick = this.onElementClick.bind(this)
        this.onPlayPauseClick = this.onPlayPauseClick.bind(this)
        this.onUndoClick = this.onUndoClick.bind(this)
        this.onStop = this.onStop.bind(this)
        this.showStopModal = this.showStopModal.bind(this)
        this.showTeamInputModal = this.showTeamInputModal.bind(this)
        this.restartGame = this.restartGame.bind(this)
        this.startCountdown = this.startCountdown.bind(this)
        this.onTeamFinished = this.onTeamFinished.bind(this)
        this.isLastClickedElement = this.isLastClickedElement.bind(this)
    }

    startCountdown() {
        this.clockCall = setInterval(() => {
            // Countdown should just be on when the game is started and not paused
            if(!this.state.gameStarted || this.state.gamePaused) {
                return;
            }

            if(this.countdownElement.getTimeInSec() == 0) {
                clearInterval(this.clockCall)
                this.onTeamFinished()
                return
            }
            this.countdownElement.setTime(this.countdownElement.getTimeInSec() - 1)
        }, 1000)
    }
    
    componentWillUnmount() {
        clearInterval(this.clockCall)
    }

    /**
     * Called when the countdown reaches 0. 
     * If team one was playing, the run data will be temporarly saved and a new game initialized for the second team.
     * If team two was playing, the current run data will be merged with the data of the first team and saved. 
     */
    onTeamFinished() {
        tempOneKey = "temp_one"
        if(this.playingTeam == FIRST_TEAM) {
            total = this.game.total
            LocalStorage.saveObject(tempOneKey, this.game.exportGameData())
            this.restartGame()
            this.playingTeam = SECOND_TEAM
            // Nice animation for showing that it is the turn of the second team
            Alert.alert(i18n.t("alert_title_first_team_finished"), i18n.t("alert_text_first_team_finished", {total: total}))
            return;
        }

        if(this.playingTeam == SECOND_TEAM) {
            LocalStorage.retrieveObject(tempOneKey).then(teamOneGameData => {
                teamTwoGameData = this.game.exportGameData()
            
                gameData = new GameHistory(this.state.teamOneName, this.state.teamTwoName,
                    teamOneGameData, teamTwoGameData)

                firstTotal = teamOneGameData.total_points 
                secondTotal = teamTwoGameData.total_points 
                firstTeamBestRun = teamOneGameData.best_run_points
                secondTeamBestRun = teamTwoGameData.best_run_points
                
                LocalStorage.saveObject(""+gameData.timestamp, gameData).then(() => {
                    LocalStorage.delete(tempOneKey)

                    // If there rare case becomes true that the total points and also the best run points we have to show a special alert
                    if(firstTotal == secondTotal && firstTeamBestRun == secondTeamBestRun) {
                        Alert.alert(i18n.t("alert_title_no_one_won"), i18n.t("alert_text_no_one_won", {firstTotal: firstTotal, secondTotal: secondTotal, firstTeamBestRun: firstTeamBestRun, secondTeamBestRun: secondTeamBestRun}),
                        [{text: 'OK', onPress: () => this.props.navigation.navigate("Home")}])
                        return
                    }

                    winner = ""
                    alertMessage = ""
                    if(firstTotal != secondTotal) {
                        winner = firstTotal > secondTotal ? this.state.teamOneName : this.state.teamTwoName
                        alertMessage = i18n.t("alert_text_won_by_total", {firstTotal: firstTotal, secondTotal: secondTotal})
                    } else {
                        winner = firstTeamBestRun > secondTeamBestRun ? this.state.teamOneName : this.state.teamTwoName
                        alertMessage = i18n.t("alert_text_won_by_best_run", {firstTotal: firstTotal, secondTotal: secondTotal, firstTeamBestRun: firstTeamBestRun, secondTeamBestRun: secondTeamBestRun})
                    }
                    Alert.alert(i18n.t("alert_title_won", {name: winner}), alertMessage,
                    [{text: 'OK', onPress: () => this.props.navigation.navigate("Home")}])       
                })
            }).catch(error => console.log(error.message))
        }
    }

    /**
     * Called after press on a game element. Depending on the element the current run points will be increased.
     * See for more information see file Game.js.
     * Excepted elements are "delete run points" and "save run points". 
     * These elements have separate called methods -> see onDelete() and onSave()
     */
    onElementClick(elementName, position) {
        if(this.state.gamePaused || !this.state.gameStarted) {
            Alert.alert(i18n.t("alert_title_game_is_not_running"), i18n.t("alert_text_game_is_not_running"))
            return
        }

        this.game.addPoints(elementName, position)
        current = this.game.getCurrent()
        this.setState({current: current}) 
    }

    isLastClickedElement(position) {
        if(!this.state.gameStarted) {
            return false
        }

        return this.game.getLastClickedPosition() == position
    }

    /**
     * Called when the element "delete run points" is clicked 
     * and the current run points should be reset to 0
     */
    onDelete() {
        if(this.state.gamePaused || !this.state.gameStarted) {
            Alert.alert(i18n.t("alert_title_game_is_not_running"), i18n.t("alert_text_game_is_not_running"))
            return
        }

        this.game.cancelRun()
        this.setState({current: this.game.getCurrent()})
    }

    /**
     * Called when the element "save run points" is clicked
     *  and the current run points should be added to the toal points
     */
    onSave() {
        if(this.state.gamePaused || !this.state.gameStarted) {
            Alert.alert(i18n.t("alert_title_game_is_not_running"), i18n.t("alert_text_game_is_not_running"))
            return
        }

        this.game.saveRun()
        this.setState({total: this.game.getTotal()})
        this.setState({current: this.game.getCurrent()})
    }

    /**
     * Called after press on the play/pause button on the game control board
     */
    onPlayPauseClick() {
        if(this.state.gameStarted == false) { 
            this.startCountdown();
            this.setState({gameStarted: true})
            return
        }

        this.setState({gamePaused: !this.state.gamePaused})
    }

    /**
     * Called after press on the undo button on the game control board
     */
    onUndoClick() {
        this.game.undoLatestAction()
        current = this.game.getCurrent() 
        total = this.game.getTotal()
        this.setState({current: current, total: total}) 
    }

    /**
     * Called after press on the stop button on the game control board or time is over
     */
    onStop() {
        this.setState({gameStopped: true, gamePaused: true})
    }

    /**
     * Called when the game is stopped and the button "restart game" is pressed on the modal view
     */
    restartGame() {
        this.game = new Game()
        this.setState({
            current: 0, 
            total: 0, 
            gamePaused: false, 
            gameStopped: false, 
            gameStarted: false, 
        }) 

        this.countdownElement.setTime(gameDuration)
        
        clearInterval(this.clockCall)


        // TODO(ap) : is there more to do for the restart?
    }

    /**
     * Called at the beginning of a new game so the team names can be defined.
     * If the modal is visible is controled over the state variable "teamInputVisible"
     */
    showTeamInputModal() {
        const {navigate} = this.props.navigation
        shouldShow = this.state.teamInputVisible

        contentView = (<View />)
        if(shouldShow) {
            contentView = (
                <ModalTeamInput ref={ref => (this.teamInputView = ref)} 
                width={"100%"}
                height={"60%"}
                onLastSubmitEditing={() => {
                    firstTeam = this.teamInputView.getInput(ModalTeamInput.FIRST_TEAM)
                    secondTeam = this.teamInputView.getInput(ModalTeamInput.SECOND_TEAM)
                    if(firstTeam == "" || secondTeam == "") {
                        Alert.alert(i18n.t("alert_title_one_team_not_named"), i18n.t("alert_text_one_team_not_named"))
                        return
                    }
                    this.setState({teamInputVisible: false, teamOneName: firstTeam, teamTwoName: secondTeam})
                }} />
            )
        }
        return(
            <ModalView isVisible={shouldShow} 
            contentView={contentView} 
            onCancelBtnPress={() => navigate('Home')} 
            onOkBtnPress={() => {
                firstTeam = this.teamInputView.getInput(ModalTeamInput.FIRST_TEAM)
                secondTeam = this.teamInputView.getInput(ModalTeamInput.SECOND_TEAM)
                if(firstTeam == "" || secondTeam == "") {
                    Alert.alert(i18n.t("alert_title_one_team_not_named"), i18n.t("alert_text_one_team_not_named"))
                    return
                }
                this.setState({teamInputVisible: false, teamOneName: firstTeam, teamTwoName: secondTeam})
            }}
            />
        )
    } 

    /**
     * The modal will be visible when the "stop" button on the game control board is clicked
     */
    showStopModal() {
        const {navigate} = this.props.navigation

        modalView = ( 
            <View style={{height: "100%", width: "100%", justifyContent: "space-between", alignItems: "center", paddingTop: 40, paddingBottom: 40}}>
                <ModalButton styles={{height: "25%", width: "80%", borderRadius: roundedCorner, marginBottom: 20}} btnText={i18n.t("restartGame")} onPress={this.restartGame}/>
                <ModalButton styles={{height: "25%", width: "80%", borderRadius: roundedCorner, marginBottom: 20}} btnText={i18n.t("cancelGame")} onPress={() => navigate('Home')}/> 
                <ModalButton styles={{height: "25%", width: "80%", borderRadius: roundedCorner,}} btnText={i18n.t("backToGame")} onPress={() => this.setState({gameStopped: false})}/>
            </View>
        )

        return (
            <ModalView isVisible={this.state.gameStopped} contentView={modalView} showButtons={false} />
        )
    }

    /**
     * The modal will be visible when the countdown is clicked and the game is not started yet.
     * => See state variable "gameStarted"
     */
    showChangeCountdownModal() { 
        time = secInMinutes(gameDuration)

        modalView = ( 
            <ModalTimeSet 
            ref={ref => (this.timeInputView = ref)} 
            height="60%" 
            width="100%"
            minute={time.minutes}
            seconds={time.seconds}
            onLastSubmitEditing={() => {
                minutes = this.timeInputView.getInput(ModalTimeSet.MINUTE)
                seconds = this.timeInputView.getInput(ModalTimeSet.SECOND)

                inSec = (minutes * 60) + seconds
                gameDuration = inSec
                this.countdownElement.setTime(inSec)
                this.setState({onCountdownPressed: false})
            }}
             />
        )

        return (
            <ModalView isVisible={this.state.onCountdownPressed} 
                contentView={modalView} 
                onCancelBtnPress={() => this.setState({onCountdownPressed: false})} 
                onOkBtnPress={() => {
                    minutes = this.timeInputView.getInput(ModalTimeSet.MINUTE)
                    seconds = this.timeInputView.getInput(ModalTimeSet.SECOND)

                    inSec = (minutes * 60) + seconds
                    gameDuration = inSec
                    this.countdownElement.setTime(inSec)
                    this.setState({onCountdownPressed: false})
                }}/>
        )
    }

    render() {
        return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.rootView}>
            <KeepAwake />
            <StatusBar hidden={true} />
            {this.showTeamInputModal()}  
            {this.showStopModal()}
            {this.showChangeCountdownModal()}

            {/* Even though the game control board will be shown at the bottom
             we have to put up here in the code because otherwise this view overlays the GymnasticElement with an absolute position which would cause that no GymnasticElement is clickable anymore. */}
            <View style={customStyles.controlBoard}>
                <GameControlBoard current={this.state.current} total={this.state.total} gameStarted={this.state.gameStarted} gamePaused={this.state.gamePaused} onPlayPauseClick={this.onPlayPauseClick} onStopClick={this.onStop} onUndoClick={this.onUndoClick}/>
            </View>
            

            <GymnasticElement styles={customStyles.topLeftBuzzer} imageUri={ImageSources.buzzer.uri} onPress={() => this.onElementClick(Game.elements.BUZZER, 1)} isLastClicked={this.isLastClickedElement(1)}/>

            <GymnasticElement styles={customStyles.topRightVaultingBox}  imageUri={ImageSources.vaultingBox.uri} onPress={() => this.onElementClick(Game.elements.VAULTING_BOCK, 2)} isLastClicked={this.isLastClickedElement(2)}/>

            <View style={customStyles.countdown}>
                <Countdown ref={el => this.countdownElement = el} time={gameDuration} width={"100%"} height={"100%"} onPress={() => {
                    if(this.state.gameStarted) {
                        return
                    }
                    this.setState({onCountdownPressed: true})
                }}/>
            </View>
            <GymnasticElement styles={customStyles.rings}  imageUri= {ImageSources.rings.uri} onPress={() => this.onElementClick(Game.elements.RINGS, 3)} isLastClicked={this.isLastClickedElement(3)}/>

            <GymnasticElement styles={customStyles.longBench} imageUri= {ImageSources.longBench.uri} onPress={() => this.onElementClick(Game.elements.LONG_BENCH, 4)} isLastClicked={this.isLastClickedElement(4)}/>

            <GymnasticElement styles={customStyles.leftMat} imageUri= {ImageSources.mat.uri}  onPress={() => this.onElementClick(Game.elements.MAT, 5)} isLastClicked={this.isLastClickedElement(5)}/>

            <GymnasticElement styles={customStyles.vaultingHorse} imageUri= {ImageSources.vaultingHorse.uri} onPress={() => this.onElementClick(Game.elements.VAULTING_HORSE, 6)} isLastClicked={this.isLastClickedElement(6)}/>

            <GymnasticElement styles={customStyles.savePoints} imageUri={ImageSources.savePoints.uri} onPress={this.onSave} isLastClicked={this.isLastClickedElement(Game.SAVE_RUN_BTN_POSITION)}/>

            <GymnasticElement styles={customStyles.rightMat} imageUri= {ImageSources.mat.uri} onPress={() => this.onElementClick(Game.elements.MAT, 7)} isLastClicked={this.isLastClickedElement(7)}/>


            <GymnasticElement styles={customStyles.deletePoints}  imageUri={ImageSources.deletePoints.uri} onPress={this.onDelete} isLastClicked={this.isLastClickedElement(Game.DELETE_RUN_BTN_POSITION)}/>

            <GymnasticElement styles={customStyles.bottomVaultingBock} imageUri= {ImageSources.vaultingBox.uri} onPress={() => this.onElementClick(Game.elements.VAULTING_BOCK, 8)} isLastClicked={this.isLastClickedElement(8)}/>

            <GymnasticElement styles={customStyles.bottomRightBuzzer} imageUri= {ImageSources.buzzer.uri} onPress={() => this.onElementClick(Game.elements.BUZZER, 9)} isLastClicked={this.isLastClickedElement(9)}/>
        </View>
        </SafeAreaView>
        )
    }
} 
  
  const customStyles = StyleSheet.create({
    topLeftBuzzer: {
        position: "absolute",
        top: "5%", 
        left: "5%",
        height: "12%",
        aspectRatio: 1.01,
    },
    topRightVaultingBox: {
        position: "absolute",
        top: "5%",
        left: "45%",
        height: "12%",
        aspectRatio: 1.29,
    },
    rings: {
        position: "absolute",
        top: "20%",
        left: "25%",
        height: "12%",
        aspectRatio: 1.11,
    },
    longBench: {
        position: "absolute",
        top: "20%",
        left: "60%",
        width: "40%",
        aspectRatio: 3.38,
    },
    leftMat: {
        position:"absolute", 
        top: "35%", 
        left:"7%", 
        height: "15%", 
        aspectRatio: 0.72,
    },
    vaultingHorse: {
        position:"absolute", 
        top: "50%", 
        left:"35%", 
        height: "15%", 
        aspectRatio: 0.83,
    },
    savePoints: {
        position:"absolute", 
        top: "30%", 
        left:"60%", 
        height: "20%", 
        aspectRatio: 0.77,
    },
    rightMat: {
        position:"absolute", 
        top: "55%", 
        left:"80%", 
        height: "15%", 
        aspectRatio: 0.72,
    },
    deletePoints: {
        position:"absolute", 
        bottom: "20%", 
        left:"5%", 
        height: "20%", 
        aspectRatio: 0.77,
    },
    bottomVaultingBock: {
        position:"absolute", 
        bottom: "20%", 
        left: "40%",
        height: "13%",
        aspectRatio: 1.29,

    },
    bottomRightBuzzer: {
        position:"absolute", 
        bottom: "18%", 
        left: "80%", 
        height: "13%",
        aspectRatio: 1.01,
    },
    countdown: {
        position:"absolute", 
        top: "5%", 
        right:"10%", 
        height: "10%", 
        aspectRatio: 1,
    },
    controlBoard: {
        flex: 1,
        justifyContent: 'flex-end',
    }
  })