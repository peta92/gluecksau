import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';

class GameControlButton extends Component {
	render() {
		return (
            <View style={[styles.root, this.props.style]} >
            <TouchableHighlight style={styles.button} onPress={this.props.onPress} underlayColor="red">
                <SvgUri width={100} height={100} source={this.props.source}/> 
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
        width: "100%",
        borderRadius: 100/2,
        backgroundColor: 'white',
        flexWrap: "wrap",
        justifyContent:"center", 
        alignItems: "center",
    }
});

export default GameControlButton;