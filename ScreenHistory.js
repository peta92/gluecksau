import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


  
  export class HistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'History',
    };
    render() {
      return (
        <View style={styles.container}>
          <Text>History</Text>
          
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
  