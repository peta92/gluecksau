import React from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import {createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './src/ScreenHome'
import RulesScreen from './src/ScreenRules'
import HistoryScreen from './src/ScreenHistory'
import PlayScreen from './src/ScreenPlay'
import ImageSources from './src/ImageSources'
import './src/strings'

const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  Play: PlayScreen,
  Rules: RulesScreen,
  History: HistoryScreen,
}, {
  headerMode: "none",

})

const AppContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return <AppContainer />

  }

  async _cacheResourcesAsync() {
    


    const images = [];

    Object.keys(ImageSources).forEach(key => {
      picObj = ImageSources[key]

      if(Object.prototype.toString.call(picObj.uri) == "[object Object]") {
        return Object.keys(picObj.uri).forEach(key => images.push(picObj.uri[key]))
      }
      return images.push(picObj.uri) 
    });

    const cacheImages = images.map((image) => Asset.loadAsync(image))

    return Promise.all(cacheImages)

  }
}