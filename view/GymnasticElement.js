import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

export default class GymnasticElement extends React.Component {
  render() {
    const { width, height, imageUri } = this.props;
    return (
      <View style={{alignItems: 'center'}}>
        <Image source={imageUri} style={{width: {width}, height: {height}, resizeMode:"center"}}/>
      </View>
    );
  }
};

GymnasticElement.propTypes = {
	width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageUri: PropTypes.string.isRequired,
};