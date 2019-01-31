import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { i18n } from './strings';
import styles from './styles';
import  ImageSources  from './ImageSources';
import  MenuButton  from './view/MenuButton';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: i18n.t("luckyPig"),
        }; 
    render() {
        const navigating = this.props.navigation.navigate;
        return ( 
        <View style={styles.rootView}>
        <View style={[styles.container_horizontal, {justifyContent: "space-between"}]}>
            <Image source={ImageSources.leueSpel.uri} style={customStyle.mainImage}/>
 
            <Image source={ImageSources.luckyPig.uri} style={customStyle.mainImage}/>
        </View>
        <MenuButton text={i18n.t("countPoints")} onPress={() => navigating('Play')} customStyle={customStyle.menu_button} />

        <View style={[styles.container_horizontal, {justifyContent: "space-between"}]}>
            <MenuButton text={i18n.t("rules")} onPress={() => navigating('Rules')} customStyle={customStyle.menu_button} />
            <MenuButton text={i18n.t("history")} onPress={() => navigating('History')} customStyle={customStyle.menu_button} />
        </View>
        </View>
        );
    } 
}  
  
  const customStyle = StyleSheet.create({
    menu_button: {
        width: "40%",
        margin: 5,
    },
    mainImage: {
        resizeMode:"center",
        width: 193,
        height: 110
    }
  });