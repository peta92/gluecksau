import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import Colors from '../color';
class GymnasticElement extends React.Component {
  render() {
    const { styles, imageUri, onPress } = this.props;
    return (
      <TouchableHighlight style={[styles, customStyles.container]} onPress={() => onPress()} underlayColor={Colors.darkPink}>
        <Image source={imageUri} style={customStyles.image} resizeMode='contain'/>
        </TouchableHighlight>
 
    );
  }
};

GymnasticElement.propTypes = {
  styles: PropTypes.object.isRequired, 
  imageUri: PropTypes.number.isRequired, 
  onPress: PropTypes.func.isRequired
};

const customStyles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor:"#ffff",
  },
  image: {
    flex:1,
    width: null,
    height: null,
  }
});

export default GymnasticElement;