import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


  
  export class RulesScreen extends React.Component {
    static navigationOptions = {
        title: 'Rules',
    };
    render() {
      return (
        <View style={styles.container}>
          <Text>Rules</Text>
          
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
  