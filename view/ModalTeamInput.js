import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {i18n} from '../strings'
import styles from '../styles'
import {fonts} from '../styles/base'

export default class ModalTeamInput extends Component {
    static FIRST_TEAM = "first"
    static SECOND_TEAM = "second"

    constructor(props) {
        super(props)

        this.firstInput = ""
        this.secondInput = ""   
        
        this.getInput = this.getInput.bind(this)
    }

    getInput(team) {
        if(team == ModalTeamInput.FIRST_TEAM) {
            return this.firstInput
        }

        if(team == ModalTeamInput.SECOND_TEAM) {
            return this.secondInput
        }
        return ""
    }

    
  render() {
    return (
        <View style={[customStyles.modalContainer, {width: this.props.width, height: this.props.height}]}>
            <TextInput 
                returnKeyType = { "next" }
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                onChangeText={text => this.firstInput = text}
                blurOnSubmit={false} 
                placeholder={i18n.t("firstTeamPlaceholder")} 
                style={[customStyles.modalInput, styles.defaultShadow, {marginBottom: 30}]}  />
            <TextInput 
                ref={input => this.secondTextInput = input} 
                onChangeText={text => this.secondInput = text}
                onSubmitEditing={() => this.props.onLastSubmitEditing()}
                placeholder={i18n.t("secondTeamPlaceholder")} 
                style={[customStyles.modalInput, styles.defaultShadow]} />
        </View>
    );
  }
}

ModalTeamInput.propTypes = {
  onLastSubmitEditing: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

const customStyles = new StyleSheet.create({
    modalInput: {
        backgroundColor: "white",
        padding: "5%",
        borderRadius: Math.round(Dimensions.get('window').height) / 2,
        width: "90%",
        height: "30%",
        fontSize: fonts.sm,
    },
    modalContainer: {
        justifyContent:"flex-end",
        alignItems:"center",
    }
});