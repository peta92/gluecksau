import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { i18n, Capitalize } from './strings.js';

export default class HistoryScreen extends React.Component {
    static navigationOptions = {
        title: Capitalize(i18n.t("history")),
    };
    render() {
      return (
        <View style={styles.container}>
          <Text>{ Capitalize(i18n.t("history")) }</Text>
          
        </View>
      );
    }
} 
  
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});
  