import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../color';


export default class ModalButton extends Component {
  render() {
    return (
        <TouchableOpacity style={[customStyles.button, this.props.styles]}
        onPress={this.props.onPress}>
            <Text style={customStyles.buttonText}>{this.props.btnText}</Text>
        </TouchableOpacity>
     
    ); 
  }
}

ModalButton.propTypes = {
  styles: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

const customStyles = new StyleSheet.create({
    button: {
      backgroundColor: 'white',
      padding: 12,
      marginTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonText: {
      color: Colors.darkPink,
      fontWeight: "bold"
    }
});