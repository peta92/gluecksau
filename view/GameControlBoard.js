import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import GameControlButton from './GameControlButton'
import Colors from '../color'
import PlayIcon from '../assets/drawable/play.svg'
import PauseIcon from '../assets/drawable/pause.svg'
import UndoIcon from '../assets/drawable/undo.svg'
import StopIcon from '../assets/drawable/stop.svg'

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
                <GameControlButton icon={(<PlayIcon width={"100%"} height={"100%"} />)} onPress={this.props.onPlayPauseClick}/>
            );
        }

        return (
            <GameControlButton icon={(<PauseIcon width={"100%"} height={"100%"} />)} onPress={this.props.onPlayPauseClick} />
        );
    }

    renderUndoButton() {
        isStarted = this.props.gameStarted != false;
  
        return (                
            <GameControlButton style={!isStarted ? customStyles.invisibleStyle:customStyles.visibleStyle} icon={(<UndoIcon width={"100%"} height={"100%"} />)} onPress={this.props.onUndoClick} />
        )       
    }

    renderStopButton() {
        isStarted = this.props.gameStarted != false;
  
        return (                
            <GameControlButton style={!isStarted ? customStyles.invisibleStyle:customStyles.visibleStyle} icon={(<StopIcon width={"100%"} height={"100%"} />)} onPress={this.props.onStopClick} />
        )       
    }

	render() {
		return (
            <View style={customStyles.root}>
            <View style={customStyles.textContainer}>
                <Text style={customStyles.text}>Lauf</Text>
                <Text style={customStyles.text}>{this.props.current}</Text>
            </View>
                {this.renderUndoButton()}
                {this.renderPlayPauseButton()}
                {this.renderStopButton()}
                <View style={customStyles.textContainer}>
                <Text style={customStyles.text}>Total</Text>
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