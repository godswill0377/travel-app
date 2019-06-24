import React from 'react';

import { AppLoading, Asset, Font } from 'expo';
import { Root } from "native-base";
import { StatusBar } from "react-native";
import AppPreLoader from "./application/components/AppPreLoader";
import firebaseConfig from './application/utils/Firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

import Amplify from '/aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

import GuestNavigation from './application/navigations/Guest';
import LoggedNavigation from './application/navigations/Logged';
import OfflineBar from "./application/components/OfflineBar";

console.disableYellowBox = true;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      isLogged: false,
      loaded: false,
      isReady: false,
    }
  }

async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/header.jpg'),
      require('./assets/images/logo.png'),
      require('./assets/images/logo_dark.png'),
      require('./assets/images/star.png'),
      require('./assets/images/avatar.png'),
      require('./assets/images/emptylist.png'),
      require('./assets/images/avatar.jpg'),
      require('./assets/images/nointernet.png'),
      require('./assets/images/contact.png'),
      require('./assets/images/address.png'),
      require('./assets/images/audience.png'),
      require('./assets/images/schedule.png'),
      require('./assets/images/phone.png'),
      require('./assets/images/website.png'),
      require('./assets/images/bookmarked.png'),
      require('./assets/images/checked.png'),
    ]);

    await Promise.all([...imageAssets]);
  }

  async componentDidMount () {

      await Expo.Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      'simple-line-icons': require('react-native-vector-icons/Fonts/SimpleLineIcons.ttf'),
      SimpleLineIcons: require('react-native-vector-icons/Fonts/SimpleLineIcons.ttf'),
      Entypo: require('react-native-vector-icons/Fonts/Entypo.ttf'),
      Ionicons: require('react-native-vector-icons/Fonts/Ionicons.ttf'),
      anticon: require('react-native-vector-icons/Fonts/AntDesign.ttf'),
      AntDesign: require('react-native-vector-icons/Fonts/AntDesign.ttf'),
      'Material Icons': require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
      'MaterialIcons': require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),

    });



    await firebase.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        this.setState({
          isLogged: true,
          loaded: true
        });
      } else {
        this.setState({
          isLogged: false,
          loaded: true
        });
      }
    })

  }

  render() {

        if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    const {isLogged, loaded, isReady} = this.state;

    if ( ! loaded) {
      return (
        <AppPreLoader/>
        );
    }

    if(isLogged && isReady) {
      return (
        <Root>
        <OfflineBar/>
        <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
        
        <LoggedNavigation />
        </Root>
        );
    } else {
      return (
        <Root>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <GuestNavigation />
        </Root>
        );
    }
  }
}


