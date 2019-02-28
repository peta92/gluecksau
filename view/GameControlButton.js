import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet,Dimensions } from 'react-native';
import styles from '../styles'

class GameControlButton extends Component {
	render() {
		return (
            <View style={[customStyles.root, this.props.style]} >
            <TouchableHighlight style={[customStyles.button, styles.defaultShadow]} onPress={this.props.onPress} underlayColor="red">
                {this.props.icon}
          </TouchableHighlight> 
          </View>
		);
	}
}

const customStyles = StyleSheet.create({
    root: {
        flex: 1,
        flexWrap: "wrap",
        justifyContent:"center", 
        alignItems: "center",
    },
    button: {
        height: "100%",
        aspectRatio: 1,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: 'white',
        flexWrap: "wrap",
        justifyContent:"center", 
        alignItems: "center",
    }
});

export default GameControlButton;