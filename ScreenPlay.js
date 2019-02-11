import React from 'react'
import { StyleSheet, View, Alert, StatusBar } from 'react-native'
import { i18n } from './strings'
import styles from './styles'
import ImageSources  from './ImageSources'
import GymnasticElement from './view/GymnasticElement'
import GameControlBoard from './view/GameControlBoard'
import Game from './Game'  
import ModalView from './view/ModalView'
import { KeepAwake } from 'expo'
import ModalTeamInput from './view/ModalTeamInput'
import Countdown from './view/Countdown'
import ModalButton from './view/ModalButton';
import LocalStorage from './LocalStorage';
import GameHistory from './GameHistory';

const gameDuration = 5 // 4 minutes
const FIRST_TEAM = 1
const SECOND_TEAM = 2

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
            timerInSec: gameDuration, // 4 minutes
            gameStarted: false,
            gamePaused: false,
            gameStopped: false,
            teamInputVisible: true, // when the game starts they team names have to be
        }  

        this.game = new Game()

        this.playingTeam = FIRST_TEAM;

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
    }

    startCountdown() {
        this.clockCall = setInterval(() => {
            // Countdown should just be on when the game is started and not paused
            if(!this.state.gameStarted || this.state.gamePaused) {
                return;
            }

            if(this.state.timerInSec == 0) {
                clearInterval(this.clockCall)
                this.onTeamFinished()

                // TODO: Save game and start new one for second team or finish completely
                return
            }
            this.setState({timerInSec: this.state.timerInSec - 1})
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
            LocalStorage.saveObject(tempOneKey, this.game.exportGameData())
            this.restartGame()
            this.playingTeam = SECOND_TEAM
            // Nice animation for showing that it is the turn of the second team
            Alert.alert("Second team's turn")
            return;
        }

        if(this.playingTeam == SECOND_TEAM) {
            LocalStorage.retrieveObject(tempOneKey).then(teamOneGameData => {
                teamTwoGameData = this.game.exportGameData()
            
                gameData = new GameHistory(this.state.teamOneName, this.state.teamTwoName,
                    teamOneGameData, teamTwoGameData)
                
                LocalStorage.saveObject(""+gameData.timestamp, gameData).then(() => {
                    LocalStorage.delete(tempOneKey)
                    this.props.navigation.navigate("Home")
                })
                

            })
            
        }
    }

    /**
     * Called after press on a game element. Depending on the element the current run points will be increased.
     * See for more information see file Game.js.
     * Excepted elements are "delete run points" and "save run points". 
     * These elements have separate called methods -> see onDelete() and onSave()
     */
    onElementClick(elementName) {
        if(this.state.gamePaused || !this.state.gameStarted) {
            Alert.alert("GAME IS NOT RUNNING")
            return
        }

        this.game.addPoints(elementName)
        current = this.game.getCurrent()
        this.setState({current: current}) 
    }

    /**
     * Called when the element "delete run points" is clicked 
     * and the current run points should be reset to 0
     */
    onDelete() {
        if(this.state.gamePaused || !this.state.gameStarted) {
            Alert.alert("GAME IS PAUSED")
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
            Alert.alert("GAME IS PAUSED")
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
        this.game.removeLatestAddPoints()
        current = this.game.getCurrent() 
        this.setState({current: current}) 
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
            timerInSec: gameDuration
        }) 

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
                height={"70%"}
                onLastSubmitEditing={() => {
                    firstTeam = this.teamInputView.getInput(ModalTeamInput.FIRST_TEAM)
                    secondTeam = this.teamInputView.getInput(ModalTeamInput.SECOND_TEAM)
                    if(firstTeam == "" || secondTeam == "") {
                        Alert.alert("ONE TEAM NOT NAMED")
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
                    Alert.alert("ONE TEAM NOT NAMED")
                    return
                }
                this.setState({teamInputVisible: false, teamOneName: firstTeam, teamTwoName: secondTeam})
            }}
            />
        )
    }

    showStopModal() {
        const {navigate} = this.props.navigation

        modalView = (
            <View>
                <ModalButton styles={{marginBottom: 10}} btnText={i18n.t("restartGame")} onPress={this.restartGame}/>
                <ModalButton styles={{marginBottom: 10}} btnText={i18n.t("cancelGame")} onPress={() => navigate('Home')}/>
                <ModalButton btnText={i18n.t("backToGame")} onPress={() => this.setState({gameStopped: false})}/>
            </View>
        )

        return (
            <ModalView isVisible={this.state.gameStopped} contentView={modalView} showButtons={false} />
        )
    }

    render() {
        return (
            <View style={styles.rootView}>
            <KeepAwake />
            <StatusBar hidden={true} />
            {this.showTeamInputModal()}  
            {this.showStopModal()}

            <GymnasticElement styles={customStyles.topLeftBuzzer} imageUri={ImageSources.buzzer.uri} onPress={() => this.onElementClick(Game.elements.BUZZER)} />

            <GymnasticElement styles={customStyles.topRightVaultingBox}  imageUri={ImageSources.vaultingBox.uri} onPress={() => this.onElementClick(Game.elements.VAULTING_BOCK)}/>

            <View style={customStyles.countdown}>
                <Countdown time={this.state.timerInSec} width={"100%"} height={"100%"}/>
            </View>
            <GymnasticElement styles={customStyles.rings}  imageUri= {ImageSources.rings.uri} onPress={() => this.onElementClick(Game.elements.RINGS)}/>

            <GymnasticElement styles={customStyles.longBench} imageUri= {ImageSources.longBench.uri} onPress={() => this.onElementClick(Game.elements.LONG_BENCH)} />

            <GymnasticElement styles={customStyles.leftMat} imageUri= {ImageSources.mat.uri}  onPress={() => this.onElementClick(Game.elements.MAT)} />

            <GymnasticElement styles={customStyles.vaultingHorse} imageUri= {ImageSources.vaultingHorse.uri} onPress={() => this.onElementClick(Game.elements.VAULTING_HORSE)} />

            <GymnasticElement styles={customStyles.savePoints} imageUri={ImageSources.savePoints.uri} onPress={this.onSave} />

            <GymnasticElement styles={customStyles.rightMat} imageUri= {ImageSources.mat.uri} onPress={() => this.onElementClick(Game.elements.MAT)} />


            <GymnasticElement styles={customStyles.deletePoints}  imageUri={ImageSources.deletePoints.uri} onPress={this.onDelete} />

            <GymnasticElement styles={customStyles.bottomVaultingBock} imageUri= {ImageSources.vaultingBox.uri} onPress={() => this.onElementClick(Game.elements.VAULTING_BOCK)}/>

            <GymnasticElement styles={customStyles.bottomRightBuzzer} imageUri= {ImageSources.buzzer.uri} onPress={() => this.onElementClick(Game.elements.BUZZER)} />

            <View style={customStyles.controlBoard}>
                <GameControlBoard current={this.state.current} total={this.state.total} gameStarted={this.state.gameStarted} gamePaused={this.state.gamePaused} onPlayPauseClick={this.onPlayPauseClick} onStopClick={this.onStop} onUndoClick={this.onUndoClick}/>
            </View>

        </View>
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
        bottom: "23%", 
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
        position:"absolute", 
        bottom: "5%", 
        left:"5%", 
        height: "10%", 
        width: "100%",
        flexDirection:"row"
    }
  })