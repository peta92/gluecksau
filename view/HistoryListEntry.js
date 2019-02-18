import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { responsiveFontSize } from '../styles/base'
import styles from '../styles'

export default class HistoryListEntry extends Component {
	render() {
		const { item } = this.props;
		return (
            <View style={customStyles.container}>
                <View style={[styles.container_horizontal, customStyles.dateContainer]}>
                <Text style={customStyles.dateText}>{moment(item.timestamp).format("DD.MM.YYYY HH:mm")}</Text>
                </View>
                <View style={[styles.container_horizontal, {marginBottom: 10, marginTop: 10}]}>
                <View style={customStyles.entryContainerLeft}>
                    <Text style={customStyles.teamOnePnt}>{item.teamOne.data.total_points}</Text>
                </View>
                <View style={customStyles.entryContainerMiddle}>
                    <Text>:</Text>
                </View>
                <View style={customStyles.entryContainerRight}>
                    <Text style={customStyles.teamTwoPnt}>{item.teamTwo.data.total_points}</Text>
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
      backgroundColor: "white",
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
      color: "black",
    },
    teamTwoPnt: {
      fontSize: responsiveFontSize(4),
      color: "black",
    },
    dateText: {
      fontSize: responsiveFontSize(1.5),
      color: "grey",
    },
    nameText: {
      fontSize: responsiveFontSize(1.5),
      color: "grey",
    },
  });