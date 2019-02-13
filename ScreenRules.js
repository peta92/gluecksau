import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { i18n, Capitalize } from './strings';
import styles from './styles';
import RulesSectionView from './view/RulesSectionView'
import ScreenHeader from './view/ScreenHeader'; 

screenHeight = Dimensions.get('window').height
test = screenHeight *0.2

  export default class RulesScreen extends React.Component {
    static navigationOptions = {
        title: Capitalize(i18n.t("rules")),
    };


    render() {
      return (

        <View style={[styles.rootView, {paddingBottom:0}]}>
        <ScreenHeader 
          styles={customStyles.headerContainer} 
          headerText={Capitalize(i18n.t("rules"))}
          onPress={() => this.props.navigation.navigate("Home")}/>

      <ScrollView style={customStyles.scrollView}>
          
        <RulesSectionView title={ i18n.t("rules_organization_title") } text={ i18n.t("rules_organization_text") } />
        <RulesSectionView title={ i18n.t("rules_procedure_title") } text={ i18n.t("rules_procedure_text") } />
        <RulesSectionView title={ i18n.t("rules_assessment_title") } text={ i18n.t("rules_assessment_text") } />
        <RulesSectionView title={ i18n.t("rules_referee_title") } text={ i18n.t("rules_referee_text") } />
        <RulesSectionView title={ i18n.t("rules_punishment_title") } text={ i18n.t("rules_punishment_text") } />
        <RulesSectionView title={ i18n.t("rules_points_title") } text={ i18n.t("rules_points_text") } />
        <View style={{height: 20}}></View>
      </ScrollView>
      </View>
        
      );
    }
  }
  
  const customStyles = StyleSheet.create({
    headerContainer: {
      width: "100%",
      height: test,
    },
    scrollView: {
      marginLeft: -20,
      marginRight: -20,
    }
  });
  