import {createStackNavigator, createAppContainer } from 'react-navigation';
import SearchScrean from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';
import * as Font from 'expo-font';
import LandingScreen from './src/screens/LandingScreen';





  
 Font.loadAsync({
     'billabong': require('./assets/fonts/Billabong.ttf')
   })

const navigator = createStackNavigator({
  Landing: LandingScreen,
  Search : SearchScrean,
  Result : ResultsShowScreen
},{
  initialRouteName : 'Landing',
  defaultNavigationOptions :{
    title: 'Foodie\'S ',
  }
})


export default createAppContainer(navigator)



