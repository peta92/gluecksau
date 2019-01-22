import React from 'react';
import { View, Image } from 'react-native';

export class GymnasticElement extends React.Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Image source={this.props.imageUri} style={{width: 193, height: 110}}/>
      </View>
    );
  }
};