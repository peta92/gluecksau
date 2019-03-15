import React, {Component} from 'react'
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import {i18n} from '../strings'
import styles from '../styles'
import {fonts} from '../styles/base'

export default class ModalTimeSet extends Component {
    static MINUTE = "minute"
    static SECOND = "second"

    constructor(props) {
        super(props)

        this.state = {
            minuteInput: props.minute,
            secondsInput: props.seconds
        }
        
        this.getInput = this.getInput.bind(this)
    }

    getInput(team) {
        if(team == ModalTimeSet.MINUTE) {
            return this.state.minuteInput
        }

        if(team == ModalTimeSet.SECOND) {
            return this.state.secondsInput
        }
        return ""
    }

    
  render() {
    return (
        <View style={[customStyles.modalContainer, {width: this.props.width, height: this.props.height}]}>
            <View style={customStyles.labelInputContainer}>
                <View style = { customStyles.labelContainer }>
                    <Text style={customStyles.label}>{i18n.t("minutePlaceholder")}</Text>
                </View> 
                <TextInput 
                    returnKeyType ="next"
                    onSubmitEditing={() => { this.secondsInput.focus(); }}
                    placeholder={i18n.t("minutePlaceholder")} 
                    value={""+this.state.minuteInput} 
                    blurOnSubmit={false} 
                    style={[customStyles.modalInput, styles.defaultShadow]}
                    keyboardType='numeric' 
                    onChangeText={value => {
                        if(value == "") value = 0
                        if(!isNaN(value)) {
                            value = parseInt(value)
                            value = value < 0 ? 0 : value 
                            this.setState({minuteInput: value})
                        }
                    }}
                />
            </View>
            <View style={{height: "5%"}} />
            <View style={customStyles.labelInputContainer}>
                <View style = { customStyles.labelContainer }>
                    <Text style={customStyles.label}>{i18n.t("secondsPlaceholder")}</Text>
                </View> 

                <TextInput 
                    ref={input => this.secondsInput = input} 
                    placeholder={i18n.t("secondsPlaceholder")} 
                    value={""+this.state.secondsInput} 
                    keyboardType='numeric' 
                    returnKeyType='done'
                    style={[customStyles.modalInput, styles.defaultShadow]}
                    onSubmitEditing={() => this.props.onLastSubmitEditing()}
                    onChangeText={value => {
                        if(value == "") value = 0
                        if(!isNaN(value)) {
                            value = parseInt(value)
                            if(value < 0) value = 59
                            if(value > 59)value = 0
                            this.setState({secondsInput: value})
                        }
                    
                    }}
                />
            </View>
        </View>
    );
  }
}

ModalTimeSet.propTypes = {
  onLastSubmitEditing: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  minute: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
}

const customStyles = new StyleSheet.create({
    modalContainer: {
        justifyContent:"flex-end",
        alignItems:"center",

    },
    labelInputContainer: {
        width: "100%",
        height: "45%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    labelContainer: {
        width: "30%",
        height: "100%",
        justifyContent:'center',
        alignItems: "center",
    },
    label: {
        textAlign:"center",
        textAlignVertical: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: fonts.sm,
    },
    modalInput: {
        backgroundColor: "white",
        padding: "5%",
        borderRadius: Math.round(Dimensions.get('window').height) / 2,
        fontSize: fonts.sm,
        width: "60%",
        height: "70%",
    }
});