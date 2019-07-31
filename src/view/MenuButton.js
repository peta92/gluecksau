import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import styles from '../styles'

class MenuButton extends Component {

	constructor(props) {
		super(props)
		this.state = {
			pressed: false
		}
	}
	render() {
		const { imgSource, onPress, customStyle } = this.props;
		return (
			<TouchableOpacity 
			style={customStyle}	
			// We don't want an opacity because we show a specific "pressed" image
			activeOpacity={1} 
			onPress={() => onPress()} 
			// When this event is fired the "pressed" image of the button should be shown
			onPressIn={() => this.setState({pressed: true})}
			// When this event is fired the "default" image of the button should be shown again
			onPressOut={() => this.setState({pressed: false})}>

				<Image 
				source={!this.state.pressed ? imgSource.default: imgSource.pressed} 
				style={[styles.fitParentImage]} 
				fadeDuration={0}
				resizeMode="contain"/>

		  </TouchableOpacity>
		);
	}
} 

MenuButton.propTypes = {
	onPress: PropTypes.func.isRequired,
};

const btnStyle = StyleSheet.create({ 
  // Styles can be defined here for the MenuButton component
});

export default MenuButton;