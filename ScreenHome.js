import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Strings } from "./strings.js";
import { ImageSources } from './ImageSources.js'
import { GymnasticElement } from './GymnasticElement.js'
  
export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Glücksau',
        };
    render() {
        return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <GymnasticElement imageUri= {ImageSources.buzzer.uri} />
            <View style={styles.container_horizontal}>
                <Button title={Strings.rules} onPress={() => this.props.navigation.navigate('Rules')}  style="width: 40%"/>
                <Button title={Strings.history} onPress={() => this.props.navigation.navigate('History')} style="width: 40%" />
 
            </View>
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
    container_horizontal: {
        
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
  });