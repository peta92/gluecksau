import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { responsiveFontSize, fonts } from '../styles/base'
import styles from '../styles'
import {i18n} from '../strings'

export default class HistoryListEntry extends Component {

  constructor(props) {
    super(props)

    this.renderBestRunPoints = this.renderBestRunPoints.bind(this)
  }
  renderBestRunPoints(points) {

    return(
      <View style={{flex: 1, flexDirection: "column", alignSelf: "flex-start", justifyContent: "center", alignItems: "center"}}>
            <Text style={customStyles.bestRunText}>{i18n.t("history_best_run")}</Text>
            <Text style={customStyles.bestRunText}>{points}</Text>
      </View>
    )
  }

	render() {
    const { item } = this.props
    isDraw = item.teamOne.data.total_points == item.teamTwo.data.total_points

		return (
            <View style={customStyles.container}>
                <View style={[styles.container_horizontal, customStyles.dateContainer]}>
                    <Text style={customStyles.dateText}>{moment(item.timestamp).format("DD.MM.YYYY HH:mm")}</Text>
                </View>
                <View style={[styles.container_horizontal, {marginBottom: 10, marginTop: 10}]}>
                  <View style={customStyles.entryContainerLeft}>
                      {isDraw ? this.renderBestRunPoints(item.teamOne.data.best_run_points): null }
                      <Text style={customStyles.teamOnePnt}>{item.teamOne.data.total_points}</Text>
                  </View>
                  <View style={customStyles.entryContainerMiddle}>
                      <Text style={{fontSize: responsiveFontSize(4), color: "#263238"}}>:</Text>
                  </View>
                  <View style={customStyles.entryContainerRight}>
                      <Text style={customStyles.teamTwoPnt}>{item.teamTwo.data.total_points}</Text>
                      {isDraw ? this.renderBestRunPoints(item.teamTwo.data.best_run_points): null }
                  </View>
                </View>
                <View style={styles.container_horizontal}>
                  <View style={customStyles.entryContainerLeft}>
                      <Text style={customStyles.nameText}>{item.teamOne.name}</Text>
                  </View>
                  <View style={customStyles.entryContainerMiddle} />
              
                  <View style={customStyles.entryContainerRight}>
                      <Text style={customStyles.nameText}>{item.teamTwo.name}</Text>
                  </View>
                </View>
            </View>
		);
	}
}

HistoryListEntry.propTypes = {
    item: PropTypes.object.isRequired
};

const customStyles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: "#ffff",
      padding: 10,
      shadowOffset:{  width: 2,  height: 2,  },
      shadowColor: 'black',
      shadowOpacity: 0.2,
    },
    dateContainer: {
      marginBottom: 5
    },
    entryContainerLeft : {
      width: "40%",
      flexDirection: "row",
      justifyContent:"flex-end",
      alignContent: "flex-end",
      alignItems: "center",
    },
    entryContainerMiddle : {
      width: "20%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    entryContainerRight : {
      width: "40%",
      flexDirection: "row",
      justifyContent:"flex-start",
      alignItems: "center",
    },
    teamOnePnt: {
      fontSize: responsiveFontSize(4),
      color: "#263238",
    },
    teamTwoPnt: {
      fontSize: responsiveFontSize(4),
      color: "#263238",
    },
    dateText: {
      fontSize: fonts.sm,
      color: "#757575",
    },
    nameText: {
      fontSize: fonts.sm,
      color: "#757575",
    },
    bestRunText: {
      fontSize: responsiveFontSize(1.3), 
      color: "#ef5350", 
      fontWeight: "bold"
    }
  });