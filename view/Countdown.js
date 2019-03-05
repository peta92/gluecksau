import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../color'
import { secInMinutes } from '../utils'
import {fonts} from '../styles/base'

export default class Countdown extends Component {

    constructor(props) {
        super(props)

        this.renderDisplayTime = this.renderDisplayTime.bind(this) 
    }

    renderDisplayTime(time) {
        timeObj = secInMinutes(time)

        minutes = ('0' + timeObj.minutes).slice(-2)
        seconds = ('0' + timeObj.seconds).slice(-2)

        return {
            minutes: minutes,
            seconds: seconds
        }
    }

	render() {
        displayTime = this.renderDisplayTime(this.props.time)

		return (
            <TouchableOpacity style={{width: this.props.width, height: this.props.height, activeOpacity: 0}} onPress={this.props.onPress}>
            <View style={customStyles.container}>
                <Text style={[customStyles.text, customStyles.firstText]}>{displayTime.minutes}</Text>
                <Text style={[customStyles.text, customStyles.middleText]}>:</Text>
                <Text style={[customStyles.text, customStyles.lastText]}>{displayTime.seconds}</Text>
            </View>
            </TouchableOpacity> 
		);
	}
}

Countdown.propTypes = {
    time: PropTypes.number.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onPress: PropTypes.func.isRequired
}

const customStyles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 1,
        padding: 5,
        borderWidth:2,
        borderColor: Colors.darkPink,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent:"center", 
        alignItems: "center"
    },
    text: {
        color: Colors.darkPink,
        fontWeight:"bold",
        fontSize: fonts.sm,
    },
    firstText: {

    },
    middleText: {

    },
    lastText: {

    }
});