import React, {Component} from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../color'
import styles from '../styles'
import {fonts} from '../styles/base'

export default class ModalButton extends Component {
  render() {
    return (
        <TouchableOpacity style={[customStyles.button, styles.defaultShadow, this.props.styles]}
        onPress={this.props.onPress}>
            <Text style={customStyles.buttonText}>{this.props.btnText}</Text>
        </TouchableOpacity>
    ); 
  }
}

ModalButton.propTypes = {
  styles: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  btnText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

const customStyles = new StyleSheet.create({
    button: {
      backgroundColor: 'white',
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'rgba(0, 0, 0, 0.1)',
     
    },
    buttonText: {
      fontSize: fonts.sm,
      color: Colors.darkPink,
      fontWeight: "bold"
    }
});