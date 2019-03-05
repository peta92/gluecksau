import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
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
        <SafeAreaView style={styles.safeAreaView}>

        <View style={styles.rootView}>
            <View style={customStyle.leueSpelImage}>
                <Image source={ImageSources.leueSpel.uri} style={styles.fitParentImage} resizeMode='contain'/>
            </View>
            <View style={customStyle.mainImage}>
                <Image source={ImageSources.luckyPig.uri} style={styles.fitParentImage} resizeMode="contain"/>
            </View>
        
            <View style={customStyle.btnContainer}>
                <MenuButton imgSource={ImageSources.homePlayBtn.uri} onPress={() => navigating('Play')} customStyle={customStyle.menu_button} />
            
            </View>
            <View style={customStyle.twoBtnContainer}>
                <MenuButton imgSource={ImageSources.homeRulesBtn.uri} onPress={() => navigating('Rules')} customStyle={[customStyle.menu_button, {marginRight: 10}]} />
                <MenuButton imgSource={ImageSources.homeHistoryBtn.uri} onPress={() => navigating('History')} customStyle={customStyle.menu_button} />
            </View>
        </View>
        </SafeAreaView>
        );
    } 
}  
  
  const customStyle = StyleSheet.create({
    menu_button: {
        width: "50%",
        aspectRatio: 1.41,
    },
    leueSpelImage: {
        position:"absolute",
        top: "5%",
        left: "5%",
        height: "10%",
        aspectRatio: 1.16,
    },
    mainImage: {
        position:"absolute",
        top: "5%",
        left: "30%",
        height: "35%",
        aspectRatio: 0.88,
    },
    btnContainer: {
        position: "absolute",
        top: "45%",
        left: 20,
        height: "25%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    twoBtnContainer: {
        position: "absolute",
        top: "75%",
        left: 15,
        height: "25%",
        width: "100%",
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: 'row',
    }
  });