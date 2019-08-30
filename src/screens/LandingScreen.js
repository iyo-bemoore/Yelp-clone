import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { withNavigation } from 'react-navigation';


const LandingScreen = ({navigation}) => {
    return (
       <View style={[styles.container, styles.horizontal]} > 
         <Image source={require('../../assets/images/food1.jpg')} style={styles.logo} >
         </Image>
         <Text  onPress={() => navigation.navigate('Search') } style={styles.textStyle}> Tap To continue </Text>     
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'black'
    },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10
    },
    logo:{
        alignSelf:'center'
    },
    textStyle:{
        color:'white',
        alignSelf:'center'

    }
});

export default withNavigation(LandingScreen);