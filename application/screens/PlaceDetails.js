 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import{ ImageBackground, Dimensions, View, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Linking, Image, AsyncStorage} from 'react-native';
import Icono from 'react-native-vector-icons/Ionicons';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Tab, Tabs } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import PlaceForm from '../forms/PlaceForm';
import PlaceComments from '../forms/PlaceComments';
import BannerAd from '../components/BannerAd';
import SwiperFlatList from 'react-native-swiper-flatlist';
import HTML from 'react-native-render-html';
import { Popup } from 'react-native-map-link';
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Modal from 'react-native-modalbox';

import ToastModal from '../components/ToastModal';
import {Toast} from 'antd-mobile-rn';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class PlaceDetails extends Component {
static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.place_name}`,
    });

  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      item: params.item,
      isLoading: true,
      isVisible: false,
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3
    };
  }

  componentDidMount() {
           
      return fetch(ConfigApp.URL+'json/data_gallery.php?place='+this.state.item.place_id)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             gallery: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });


     }

savePlaces = async (place_id, place_name, place_image, place_audience, place_address, place_hours, place_phone, place_website, place_description, uid) => {
    try {
        let place = {
            userId: uid,
            place_id: place_id,
            place_name: place_name,
            place_image: place_image,
            place_audience: place_audience,
            place_address: place_address,
            place_hours: place_hours,
            place_phone: place_phone,
            place_website: place_website,
            place_description: place_description

        }

        const places = await AsyncStorage.getItem('places') || '[]';
        let placesFav = JSON.parse(places);
        placesItems = placesFav.filter(function(e){ return e.place_id !== place_id && e.userId == uid })
        placesItems.push(place);
        AsyncStorage.setItem('places', JSON.stringify(placesItems)).then(() => {

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
<KeyboardAwareScrollView>

<Text style={{display: 'none'}}>{item.place_name}</Text>
<Text style={{display: 'none'}}>{item.place_id}</Text>

<SwiperFlatList
          autoplay={false}
          autoplayDelay={3}
          autoplayLoop
          data={ this.state.gallery }
          renderItem={({item}) => 
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.image_name}} style={styles.background_diets}>
                </ImageBackground>

}
        keyExtractor={(item, index) => index.toString()}

        />

      <TouchableOpacity style={styles.readmore} activeOpacity={1} onPress={this.savePlaces.bind(this, item.place_id, item.place_name, item.place_image, item.place_audience, item.place_address, item.place_hours, item.place_phone, item.place_website, item.place_description, user.uid)}>
            <Icono name="md-star" style={styles.readmoreIcon} />
      </TouchableOpacity>


<Tabs tabBarUnderlineStyle={styles.tabBarUnderline} tabContainerStyle={{ elevation:0 }}>

<Tab heading={Strings.ST5} tabStyle={styles.tabs_2} activeTabStyle={styles.activetabs_2} textStyle={styles.tabs_text_2} activeTextStyle={styles.activetabs_text_2}>
       
<List style={{marginTop: 15}}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/audience.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body>
                <Text style={styles.label_details}>{Strings.ST10}</Text>
                <Text note numberOfLines={1}>{item.place_audience}</Text>
              </Body>
            </ListItem>

          <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/address.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body>
                <Text style={styles.label_details}>{Strings.ST11}</Text>
                <Text note numberOfLines={2}>{item.place_address}</Text>
              </Body>
              <Right>
                <Button onPress={() => { this.setState({ isVisible: true }) }}  transparent>
                  <Text><Icono name="ios-resize" style={{fontSize: 26, color: '#DDD'}} /></Text>
                </Button>
              </Right>
            </ListItem>


          <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/schedule.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body>
                <Text style={styles.label_details}>{Strings.ST12}</Text>
                <Text note numberOfLines={1}>{item.place_hours}</Text>
              </Body>
            </ListItem>

          <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/phone.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body>
                <Text style={styles.label_details}>{Strings.ST13}</Text>
                <Text note numberOfLines={1}>{item.place_phone}</Text>
              </Body>
            </ListItem>

          <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/website.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.label_details}>{Strings.ST14}</Text>
                <Text note numberOfLines={2}>{item.place_website}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Button onPress={ ()=>{ Linking.openURL(item.place_website)}} transparent>
                  <Text><Icono name="ios-log-out" style={{fontSize: 26, color: '#DDD'}} /></Text>
                </Button>
              </Right>
            </ListItem>

</List>
<View style={{height: 50}} />

</Tab>

<Tab heading={Strings.ST48} tabStyle={styles.tabs_2} activeTabStyle={styles.activetabs_2} textStyle={styles.tabs_text_2} activeTextStyle={styles.activetabs_text_2}>
     
<View style={{paddingLeft: 15, paddingRight: 15, marginTop: 10}}>
<HTML html={item.place_description}/>            
</View>
<View style={{height: 50}} />

</Tab>

<Tab heading={Strings.ST84} tabStyle={styles.tabs_2} activeTabStyle={styles.activetabs_2} textStyle={styles.tabs_text_2} activeTextStyle={styles.activetabs_text_2}>
     
           <ListItem icon style={{borderBottomWidth: 0}}>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.4)' }}>{Strings.ST50.toUpperCase()}</Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
                  <TouchableOpacity onPress={() => this.refs.modal3.open()} activeOpacity={1}>
                  <View style={{padding: 3, paddingRight: 11, paddingLeft: 11, borderWidth: 1, borderRadius: 50, borderColor: 'rgba(0,0,0,0.3)'}}>
                  
                  <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.4)'}}> {Strings.ST83.toUpperCase()} <Icono active name="ios-add" /></Text>
                  </View>
                  </TouchableOpacity>
            </Right>
          </ListItem>

<View style={{height: 1, backgroundColor: '#EEE', width: width, marginBottom: 5}}></View>

<View style={{margin: 15, marginBottom: 0, marginTop: 0}}>

<PlaceComments placeId={item.place_id} />



</View>


<Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} swipeArea={20} swipeToClose={this.state.swipeToClose} onClosed={this.onClose} onOpened={this.onOpen} onClosingState={this.onClosingState} isDisabled={this.state.isDisabled} coverScreen={"true"}>
<View style={{marginTop: 8, marginBottom: 8}}>
<PlaceForm placeId={this.state.item.place_id}/>
</View>
</Modal>

</Tab>

</Tabs>


<Popup
          isVisible={this.state.isVisible}
          onCancelPressed={() => this.setState({ isVisible: false })}
          onAppPressed={() => this.setState({ isVisible: false })}
          onBackButtonPressed={() => this.setState({ isVisible: false })}
          options={{
            latitude: item.place_latitude,
            longitude: item.place_longitude,
            title: item.place_name,
            dialogTitle: Strings.ST49,
            cancelText: Strings.ST60
          }}
        />

</KeyboardAwareScrollView>

<SafeAreaView>
</SafeAreaView>


</Container>

    );
  }


} 


