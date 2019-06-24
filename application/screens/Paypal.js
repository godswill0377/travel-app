import React, {Component} from 'react';
import * as firebase from 'firebase';
import AppPreLoader from '../components/AppPreLoader';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{TouchableOpacity, Dimensions, View, Image, ScrollView, WebView} from 'react-native';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Text} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Paypal extends Component {
static navigationOptions = {
  title: `${Strings.ST71}`,
};


constructor(props) {

    super(props);
    this.state = {
      isOpen: false,
    };
  }

 ActivityIndicatorLoadingView() {
    
    return (
 
        <AppPreLoader/>
    );
  }

  render () {

  var OfferId = this.props.navigation.state.params.OfferId;
  var UserId = this.props.navigation.state.params.UserId;
  var UserEmail = this.props.navigation.state.params.UserEmail;
  var UrlPayment = ConfigApp.URL+'payment/paypal/index.php?id_offer='+OfferId+'&email_user='+UserEmail;

    return (

<Container style={styles.background_general}>

 <WebView 
         source={{uri: UrlPayment}} 
         javaScriptEnabled={true}
         domStorageEnabled={true}
         renderLoading={this.ActivityIndicatorLoadingView} 
         startInLoadingState={true}  
         />

</Container>

    )
  }

}