import React from 'react';
import {createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './ScreenHome';
import {RulesScreen } from './ScreenRules';
import {HistoryScreen} from './ScreenHistory'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Rules: {screen: RulesScreen},
  History: { screen: HistoryScreen },
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}