 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { Container, Content, Body, Text, List, Right, Button, Thumbnail, ListItem, Fab} from 'native-base';
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


var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class OrderDetails extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${Strings.ST62}`,
    });

  constructor(props) {
    super(props)
    const {params} = props.navigation.state;
    this.state = {
      item: params.item,
    };
  }

  render() {

    const {item} = this.state;  

    return (
<Container style={styles.background_general}>

<ScrollView>

<View style={{margin: 10, borderWidth: 1, borderColor: '#EEE', borderRadius: 10}}>
<List>
<ListItem itemDivider>
              <Text style={{fontWeight: 'bold'}}>{Strings.ST63}</Text>
            </ListItem> 
<ListItem style={{paddingLeft: 0, marginLeft: 0, borderRadius: 12, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}} >
              <Thumbnail rounded size={80} source={{ uri: ConfigApp.URL+'images/'+item.offer_image }} style={{paddingLeft: 10, marginLeft: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={2} style={{fontSize: 14, marginBottom: 3}}>
                {item.offer_title}
                </Text>
              </Body>
            </ListItem>


<ListItem itemDivider>
              <Text style={{fontWeight: 'bold'}}>{Strings.ST88}</Text>
</ListItem>

<View style={{margin: 10}}>
<Text>{item.order_date}</Text>
</View>

<ListItem itemDivider>
              <Text style={{fontWeight: 'bold'}}>{Strings.ST89}</Text>
</ListItem>

<View style={{margin: 10}}>
<Text>{item.order_gross} {item.order_cc.toUpperCase()}</Text>
</View>

<ListItem itemDivider>
              <Text style={{fontWeight: 'bold'}}>{Strings.ST90}</Text>
</ListItem>

<View style={{margin: 10}}>
<Text>{item.order_platform}</Text>
</View>

<ListItem itemDivider>
              <Text style={{fontWeight: 'bold'}}>{Strings.ST91}</Text>
</ListItem>

<View style={{margin: 10}}>
<Text style={{color: 'green'}}>{item.order_status}</Text>
</View>

</List>
</View>
</ScrollView>
</Container>
    );
  }
}

