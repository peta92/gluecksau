import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {i18n} from '../strings'

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
        <View style={customStyles.modalContainer}>
            <TextInput 
                returnKeyType = { "next" }
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                onChangeText={text => this.firstInput = text}
                blurOnSubmit={false} 
                placeholder={i18n.t("firstTeamPlaceholder")} 
                style={[customStyles.modalInput, {marginBottom: 30}]}  />
            <TextInput 
                ref={input => this.secondTextInput = input} 
                onChangeText={text => this.secondInput = text}
                onSubmitEditing={() => this.props.onLastSubmitEditing()}
                placeholder={i18n.t("secondTeamPlaceholder")} 
                style={customStyles.modalInput} />
        </View>
    );
  }
}

ModalTeamInput.propTypes = {
  onLastSubmitEditing: PropTypes.func.isRequired
}

const customStyles = new StyleSheet.create({
    modalInput: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        width: "90%",
        height: "30%",

    },
    modalContainer: {
        justifyContent:"center",
        alignItems:"center",
        width: "100%",
        height:"100%"

    }
});