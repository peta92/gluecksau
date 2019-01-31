import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class MenuButton extends Component {
	render() {
		const { text, onPress, customStyle } = this.props;
		return (
		  <TouchableOpacity style={[styles.buttonStyle, customStyle]}	onPress={() => onPress()}>
			 <Text style={styles.textStyle}>{text}</Text>
		  </TouchableOpacity>
		);
	}
}

MenuButton.propTypes = {
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize:20,
	color: '#ffffff',
	textAlign: 'center'
  },
  
  buttonStyle: {
    borderRadius:5,
    backgroundColor: "#ff6a83",
    padding: 10,
  }
});

export default MenuButton;