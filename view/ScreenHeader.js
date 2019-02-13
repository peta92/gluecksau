import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import ImageSource from '../ImageSources'
import { responsiveFontSize } from '../styles/base'

export default class ScreenHeader extends Component {
  render() {
    return (
        <View style={[customStyles.headerContainer, this.props.styles]}> 
            <Image source={ImageSource.rulesPig.uri} style={customStyles.mainImage} resizeMode="contain"/> 
            <Text style={customStyles.header}>{this.props.headerText}</Text>
            <TouchableOpacity onPress={this.props.onPress} style={customStyles.exitButton}>
              <Image  source={ImageSource.exit.uri} style={customStyles.exitImg} resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    ); 
  }
}

ScreenHeader.propTypes = {
    styles: PropTypes.object.isRequired,
    headerText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

const customStyles = new StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
      },
      header: {
        color:"#ef6782",
        fontWeight: "bold",
        fontSize: responsiveFontSize(5),       
        marginLeft: "7%"
      },
      mainImage: {
        marginLeft: "5%",
        height: "100%",
        width: undefined,
        aspectRatio:1.02
      },
      exitButton: {
        width: "15%",
        aspectRatio: 1,
        marginLeft: "auto",
        alignSelf:"flex-start",
        alignItems:'center',
        justifyContent:'center',
      },
      exitImg: {
        width: "100%",
        height: "100%",
      }
});