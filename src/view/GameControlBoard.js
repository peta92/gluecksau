import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import GameControlButton from './GameControlButton'
import Colors from '../color'
import Play from './icons/Play' 
import Pause from './icons/Pause' 
import Undo from './icons/Undo'
import Stop from './icons/Stop'
import {responsiveFontSize} from '../styles/base'
import {i18n} from '../strings'

class GameControlBoard extends Component {

    constructor(props) {
        super(props);

        this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
        this.renderUndoButton = this.renderUndoButton.bind(this);
        this.renderStopButton = this.renderStopButton.bind(this);
    }

    renderPlayPauseButton() {
        if(this.props.gameStarted == false || this.props.gamePaused == true) {
            return (
                <GameControlButton icon={(<Play width={"100%"} height={"100%"} />)} onPress={this.props.onPlayPauseClick}/>
            );
        }

        return (
            <GameControlButton icon={(<Pause width={"100%"} height={"100%"} />)} onPress={this.props.onPlayPauseClick} />
        );
    }

    renderUndoButton() {
        isStarted = this.props.gameStarted != false;
  
        return (                
            <GameControlButton style={!isStarted ? customStyles.invisibleStyle:customStyles.visibleStyle} icon={(<Undo width={"100%"} height={"100%"} />)} onPress={this.props.onUndoClick} />
        )       
    }

    renderStopButton() {
        // The stop button should also be shown all the time so the user has a way to go back if he accidently started a game without start the game first
        return (                
            <GameControlButton icon={(<Stop width={"100%"} height={"100%"} />)} onPress={this.props.onStopClick} />
        )       
    }

	render() {
		return (
            <View style={customStyles.root}>
            <View style={customStyles.textContainer}>
                <Text style={customStyles.text}>{i18n.t("control_board_run")}</Text>
                <Text style={customStyles.text}>{this.props.current}</Text>
            </View>
                {this.renderUndoButton()}
                {this.renderPlayPauseButton()}
                {this.renderStopButton()}
                <View style={customStyles.textContainer}>
                <Text style={customStyles.text}>{i18n.t("control_board_total")}</Text>
                <Text style={customStyles.text}>{this.props.total}</Text>
            </View>
          </View> 
		);
	}
}

const customStyles = StyleSheet.create({
    root: {
        width: "100%",
        height: "10%",
        flexDirection:"row",
        flexWrap: "wrap",
        padding: 10,
        backgroundColor: Colors.darkPink,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center',
        color: "white",
        fontWeight: 'bold',
    },
    visibleStyle: {

    },
    invisibleStyle: {
        opacity:0,
    }
}); 
 
export default GameControlBoard;