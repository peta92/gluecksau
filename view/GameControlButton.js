import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';

class GameControlButton extends Component {
	render() {
		return (
            <View style={[styles.root, this.props.style]} >
            <TouchableHighlight style={styles.button} onPress={this.props.onPress} underlayColor="red">
                {this.props.icon}
          </TouchableHighlight> 
          </View>
		);
	}
}

const styles = StyleSheet.create({
    root: {

        flex: 1,
        flexWrap: "wrap",
        justifyContent:"center", 
        alignItems: "center",
    },
    button: {
        height: "100%",
        aspectRatio: 1,
        borderRadius: 100/2,
        backgroundColor: 'white',
        flexWrap: "wrap",
        justifyContent:"center", 
        alignItems: "center",
    }
});

export default GameControlButton;