import {createStackNavigator, createAppContainer } from 'react-navigation';
import SearchScrean from './src/screens/SearchScreen';




const navigator = createStackNavigator({
     Search : SearchScrean
},{
  initialRouteName : 'Search',
  defaultNavigationOptions :{
     title: 'Business search'
  }
})


export default createAppContainer(navigator)



