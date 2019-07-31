import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet} from 'react-native';
import { responsiveFontSize } from '../styles/base'

class RulesSectionView extends Component {
	render() {
		const { title, text } = this.props;
		return (
            <View style={styles.rulesSubcontainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text}</Text>
          </View>
		);
	}
}

RulesSectionView.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    rulesSubcontainer: {
        padding: 20,
        backgroundColor: '#ffff',
        margin: 20, 
        borderRadius: 20,
        shadowOpacity: 0.2,
        shadowOffset:{width: 2,  height: 2,},
        shadowColor: 'black',
        elevation: 5,
    },
    title: {
        color:"#ef6782",
        fontWeight: "bold",
        fontSize: responsiveFontSize(3),
        marginBottom: 15,
    },
    text: {
        color:"#f290a7",
        textAlign: "justify",
        fontSize:responsiveFontSize(1.5)
    }
});

export default RulesSectionView;