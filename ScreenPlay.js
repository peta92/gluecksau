import React from 'react';
import { StyleSheet, View } from 'react-native';
import { i18n } from './strings.js';
import  ImageSources  from './ImageSources.js';
import  GymnasticElement from './view/GymnasticElement.js';
import  MenuButton  from './view/MenuButton.js';

export default class PlayScreen extends React.Component {
    static navigationOptions = {
        title: i18n.t("luckyPig"),
        };
    render() {
        const navigating = this.props.navigation.navigate;
        return (
        <View style={styles.container}>
            <GymnasticElement width={100} height={100} imageUri= {ImageSources.buzzer.uri} />
            <GymnasticElement width={100} height={100} imageUri= {ImageSources.buzzer.uri} />
            <GymnasticElement width={100} height={100} imageUri= {ImageSources.buzzer.uri} />
            <GymnasticElement width={100} height={100} imageUri= {ImageSources.buzzer.uri} />

        </View>
        );
    }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      backgroundColor: '#faeff1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_horizontal: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menu_button: {
        width: "40%",
        margin: 5,
    }
  });