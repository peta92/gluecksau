import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import { i18n, Capitalize } from './strings';
import styles from './styles';
import RulesSectionView from './view/RulesSectionView'
import ImageSource from './ImageSources'; 

  export default class RulesScreen extends React.Component {
    static navigationOptions = {
        title: Capitalize(i18n.t("rules")),
    };
    render() {
      return (
        <ScrollView style={styles.scrollRootView}>
          <View style={styles.container_horizontal}> 
            <Image source={ ImageSource.rulesPig.uri} style={customStyles.mainImage}/> 
            <Text style={customStyles.header}>{i18n.t("rules").toUpperCase()}</Text>
          </View>
          <RulesSectionView title={ i18n.t("rules_organization_title") } text={ i18n.t("rules_organization_text") } />
          <RulesSectionView title={ i18n.t("rules_procedure_title") } text={ i18n.t("rules_procedure_text") } />
          <RulesSectionView title={ i18n.t("rules_assessment_title") } text={ i18n.t("rules_assessment_text") } />
          <RulesSectionView title={ i18n.t("rules_referee_title") } text={ i18n.t("rules_referee_text") } />
          <RulesSectionView title={ i18n.t("rules_punishment_title") } text={ i18n.t("rules_punishment_text") } />
          <RulesSectionView title={ i18n.t("rules_points_title") } text={ i18n.t("rules_points_text") } />
        </ScrollView>
      );
    }
  }
  
  const customStyles = StyleSheet.create({
    header: {
      color:"#ef6782",
      fontWeight: "bold",
      fontSize: 42,
      marginLeft: 20,
    },
    mainImage: {
      resizeMode:"center",
      width: 120,
      height: 110
    }
  });
  