import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, TouchableHighlight } from 'react-native'
import Colors from '../color'
import styles from '../styles'

export default class GymnasticElement extends React.Component {
  render() {

    return (
      <TouchableHighlight style={[this.props.styles, customStyles.container, styles.defaultShadow]} onPress={() => this.props.onPress()} underlayColor={Colors.darkPink}>
        <Image source={this.props.imageUri} style={customStyles.image} resizeMode='contain'/>
        </TouchableHighlight>
 
    )
  }
}

GymnasticElement.propTypes = {
  styles: PropTypes.object.isRequired, 
  imageUri: PropTypes.number.isRequired, 
  onPress: PropTypes.func.isRequired
}

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
})