import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

class GymnasticElement extends React.Component {
  render() {
    const { style, imageUri, onPress } = this.props;
    return (
      <TouchableOpacity style={[style, customStyles.container]} onPress={() => onPress()}>
        <Image source={imageUri} style={customStyles.image}/>
        </TouchableOpacity>
 
    );
  }
};

GymnasticElement.propTypes = {
  style: PropTypes.object.isRequired, 
  imageUri: PropTypes.number.isRequired, 
  onPress: PropTypes.func.isRequired
};

const customStyles = StyleSheet.create({
  container: {
    height:100,
    width:100,
    flex:1,
    backgroundColor:"#ffff",
    padding: 2

  },
  image: {
    resizeMode:"contain",
    flex:1, 
    height: undefined, 
    width: undefined
  }
});

export default GymnasticElement;