import React from 'react'
import PropTypes from 'prop-types'
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native'
import Colors from '../color'
import styles from '../styles'

export default class GymnasticElement extends React.Component {

  render() {
    overlayViewStyle = this.props.isLastClicked ? customStyles.overlay : customStyles.invisibleStyle

    return (
      <TouchableHighlight style={[this.props.styles, customStyles.container, styles.defaultShadow]} onPress={this.props.onPress} underlayColor="#f48fb1">
        <View style={{width: "100%", height: "100%"}}>
          <Image source={this.props.imageUri} style={customStyles.image} resizeMode='contain'/>
          <View style={overlayViewStyle} />
        </View>
      </TouchableHighlight>
 
    )
  }
}

GymnasticElement.defaultProps = {
  isLastClicked: false,
};

GymnasticElement.propTypes = {
  styles: PropTypes.object.isRequired, 
  imageUri: PropTypes.number.isRequired, 
  onPress: PropTypes.func.isRequired,
  isLastClicked: PropTypes.bool
}

const customStyles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor:"#ffff"
  },
  image: {
    flex:1,
    width: null,
    height: null,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(244,143,177,0.5)',
    borderRadius: 15,
  },
  invisibleStyle: {
    opacity:0,
  }
})