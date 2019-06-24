 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { Container, Content, Body, Text, List, Right, Button, ListItem, Fab} from 'native-base';
import Icono from 'react-native-vector-icons/Ionicons';
import{ ImageBackground, Dimensions, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList, AsyncStorage, Linking, Image} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';
import HTML from 'react-native-render-html';
import * as firebase from 'firebase';

import ToastModal from '../components/ToastModal';
import {Toast} from 'antd-mobile-rn';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class PostDetails extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.news_title}`,
    });

  constructor(props) {
    super(props)
    const {params} = props.navigation.state;
    this.state = {
      item: params.item,
    };
  }

savePosts = async (news_id, news_title, news_image, news_date, category_name, news_description, uid) => {
    try {
        let post = {
            userId: uid,
            news_id: news_id,
            news_title: news_title,
            news_image: news_image,
            news_date: news_date,
            category_name: category_name,
            news_description: news_description

        }

        const posts = await AsyncStorage.getItem('posts') || '[]';
        let postsFav = JSON.parse(posts);
        postsItems = postsFav.filter(function(e){ return e.news_id !== news_id && e.userId == uid })
        postsItems.push(post);
        AsyncStorage.setItem('posts', JSON.stringify(postsItems)).then(() => {

            Toast.info(Strings.ST53, 1)
           

        });
        
    } catch(error) {

    }
};

  render() {

    const {item} = this.state;  
    var user = firebase.auth().currentUser;

    return (
<Container style={styles.background_general}>

<ScrollView>

<ImageBackground source={{uri: ConfigApp.URL+'images/'+item.news_image}} style={{ height: height * 0.28,  width : null}}>
    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']} style={{ alignItems: 'flex-start', justifyContent: 'flex-end', height: height * 0.28, paddingBottom: 12, paddingLeft: 12, paddingRight: 12,   width : null}}>
    <Text style={styles.postDetail_tag}>{item.category_name}</Text>
    <Text numberOfLines={3} style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>{item.news_title}</Text>
    <Text style={styles.postDetail_date}>{item.news_date}</Text>
    </LinearGradient>
</ImageBackground>

      <Fab
            direction="down"
            style={styles.readmore}
            position="topRight"
            onPress={this.savePosts.bind(this, item.news_id, item.news_title, item.news_image, item.news_date, item.category_name, item.news_description, user.uid)}>
            <Icono name="md-star" style={styles.primarycolor} />
          </Fab>

<View style={{margin: 15, marginBottom: 5}}>

<HTML html={item.news_description} onLinkPress={(evt, href) => { Linking.openURL(href); }} />
</View>


</ScrollView>
<SafeAreaView>
<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
<BannerAd/>
</View>

</SafeAreaView>
</Container>
    );
  }
}

