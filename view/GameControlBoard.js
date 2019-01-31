import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GameControlButton from './GameControlButton';
import ImageSources from '../ImageSources'
import Colors from '../color';

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
                <GameControlButton source={ ImageSources.playIcon.uri} onPress={this.props.onPlayPauseClick}/>
            );
        }

        return (
            <GameControlButton source={ ImageSources.pauseIcon.uri} onPress={this.props.onPlayPauseClick} />
        );
    }

    renderUndoButton() {
        isStarted = this.props.gameStarted != false;
  
        return (                
            <GameControlButton style={!isStarted ? styles.invisibleStyle:styles.visibleStyle} source={ ImageSources.undoLastIcon.uri} onPress={this.props.onUndoClick} />
        )       
    }

    renderStopButton() {
        isStarted = this.props.gameStarted != false;
  
        return (                
            <GameControlButton style={!isStarted ? styles.invisibleStyle:styles.visibleStyle} source={ ImageSources.stopIcon.uri} onPress={this.props.onStopClick} />
        )       
    }

	render() {
		return (
            <View style={styles.root}>
                <Text>{this.props.current}</Text>
                {this.renderUndoButton()}
                {this.renderPlayPauseButton()}
                {this.renderStopButton()}
                <Text>{this.props.total}</Text>
          </View> 
		);
	}
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection:"row",
        flexWrap: "wrap",
        padding: 10,
        backgroundColor: Colors.darkPink,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    visibleStyle: {

    },
    invisibleStyle: {
        opacity:0,
    }
}); 
 
export default GameControlBoard;