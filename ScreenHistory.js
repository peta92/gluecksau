import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Alert, SafeAreaView } from 'react-native'
import { i18n, Capitalize } from './strings'
import styles from './styles'
import LocalStorage from './LocalStorage'
import ScreenHeader from './view/ScreenHeader';
import HistoryListEntry from './view/HistoryListEntry';

export default class HistoryScreen extends Component {
  static navigationOptions = {
    title: Capitalize(i18n.t("history")),
  };

  constructor(props) {
    super(props)

    this._isMounted = false

    this.state = { 
      histories: [],
    } 

    this.getAllGameHistories = this.getAllGameHistories.bind(this)
  }

  componentWillMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false 
  }
 
  getAllGameHistories() {
      LocalStorage.retrieveAll().then(receivedHistories => {
        if(!this._isMounted || receivedHistories == undefined || receivedHistories == null) {
          return
        }
        receivedHistories.sort((a, b) => {
          // We want the newest one on the top -> reverse sort
          return b.timestamp - a.timestamp;
        });

        this.setState({histories: receivedHistories})
      }).catch()
  }

  render() {
    this.getAllGameHistories()
    return (
      <SafeAreaView style={styles.safeAreaView}>

      <View style={[styles.rootView, {paddingBottom: 0, paddingRight: 0}]}>
        <ScreenHeader 
          styles={customStyles.headerContainer} 
          headerText={Capitalize(i18n.t("history"))}
          onPress={() => this.props.navigation.navigate("Home")}/>

        <FlatList 
        style={customStyles.list}
        data={this.state.histories}
        keyExtractor={item => ""+item.timestamp}
        ItemSeparatorComponent={() => <View style={{margin: 12}}/>}
        renderItem={({item}) => {return(<HistoryListEntry item={item} />)}}/>
      </View>
      </SafeAreaView>
    );
  }
}

const customStyles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
    paddingRight: 20
  },
  headerContainer: {
    width: "100%",
    height: "20%",
    paddingRight: 20,
    marginBottom: "5%",
    marginTop: "5%"
  },
});
  