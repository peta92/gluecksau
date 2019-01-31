import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Colors from '../color';
import {i18n} from '../strings';
import ModalButton from './ModalButton';


export default class ModalView extends Component {

  constructor(props) {
    super(props);

    this.showModalButtons = this.showModalButtons.bind(this);
  }
  showModalButtons() {
    if(!this.props.showButtons) {
      return;
    }

    return (<View style={customStyles.buttonContainer}>

      <ModalButton style={customStyles.stdButton} 
      onPress={this.props.onCancelBtnPress} 
      btnText={this.props.cancelBtnText}
      />
      <ModalButton style={customStyles.stdButton} 
      onPress={this.props.onOkBtnPress} 
      btnText={this.props.okBtnText}
      />
    </View>);
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible}>

          <View style={customStyles.modalContent}>
    
            {this.props.contentView}

            {this.showModalButtons()}
          </View>
      </Modal>
     
    ); 
  }
}

ModalView.defaultProps = {
  showButtons: true,
  contentView: (<View/>),
  onCancelBtnPress: () => Alert.alert("Press function on Cancel button not defined."),
  onOkBtnPress: () => Alert.alert("Press function on OK button not defined."),
  cancelBtnText: i18n.t("cancel"),
  okBtnText: i18n.t("ok"),
};

ModalView.propTypes = {
  showButtons: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  contentView: PropTypes.element,
  onCancelBtnPress: PropTypes.func,
  onOkBtnPress: PropTypes.func,
  cancelBtnText: PropTypes.string,
  okBtnText: PropTypes.string,
}

const customStyles = new StyleSheet.create({
    modalContent: {
      width: "100%",
      height: "40%",
      backgroundColor: Colors.darkPink,
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
      height: "30%",
      width: "100%",
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    stdButton: {
      width:"50%", 
      height:"100%"
    }
});