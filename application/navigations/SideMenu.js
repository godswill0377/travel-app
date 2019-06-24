import PropTypes from 'prop-types';
import React, {Component} from 'react';
var styles = require('../../assets/files/Styles');
import {NavigationActions} from 'react-navigation';
import {Dimensions, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Thumbnail, Button, Body, Right, Switch } from 'native-base';
var {height, width} = Dimensions.get('window');

import Strings from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';
import Icon from 'react-native-vector-icons/AntDesign';


class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container_menu}>
          <View style={styles.sideMenu}>
<Image
      source={require('../../assets/images/logo.png')}
      style={{flex: 1, width: 120, height: 120}}
      resizeMode='contain'/>
</View>

        <ScrollView>

              <ListItem style={styles.item_menu} onPress={this.navigateToScreen('PlacesCategoriesScreen')} icon>
            <Left style={{borderBottomWidth: 0}}>
                <Icon name="isv" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST1}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('OffersCategoriesScreen')} icon>
                        <Left style={{borderBottomWidth: 0}}>
                <Icon name="gift" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST2}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('NewsScreen')} icon>
                        <Left style={{borderBottomWidth: 0}}>
                <Icon name="profile" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST46}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('ProfileScreen')} icon>
                        <Left style={{borderBottomWidth: 0}}>
                <Icon name="user" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST6}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('SettingsScreen')} icon>
                        <Left style={{borderBottomWidth: 0}}>
                <Icon name="setting" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST7}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>
 
        </ScrollView>

        <TouchableOpacity onPress={this.navigateToScreen('LogoutScreen')} activeOpacity={1}>
        <View style={styles.footer_menu}>
          <Text style={{fontSize: 15, color: '#fff'}}>{Strings.ST8}</Text>
        </View>
        </TouchableOpacity>


      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;