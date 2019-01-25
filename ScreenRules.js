import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { i18n, Capitalize } from './strings.js';
import RulesSectionView from './view/RulesSectionView.js'
  
  export default class RulesScreen extends React.Component {
    static navigationOptions = {
        title: Capitalize(i18n.t("rules")),
    };
    render() {
      return (
        <ScrollView style={styles.container}>
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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      backgroundColor: '#faeff1',

    }
  });
  