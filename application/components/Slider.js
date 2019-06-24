import React, {PureComponent} from 'react';
import{ Image, View, Dimensions, Text, ImageBackground} from 'react-native';
import { NavigationActions, withNavigation} from 'react-navigation';
import Strings from '../utils/Strings';
import SwiperFlatList from 'react-native-swiper-flatlist';
import ConfigApp from '../utils/ConfigApp';

const { width, height } = Dimensions.get('window'); 
var styles = require('../../assets/files/Styles');

class Slider extends PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      gallery:[],
    };

  }

  componentDidMount() {
           
      return fetch(ConfigApp.URL+'json/data_gallery.php?place='+this.props.id)
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

  render () {

    return (
<View>
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
</View>
    )
  }

}

export default withNavigation(Slider);
