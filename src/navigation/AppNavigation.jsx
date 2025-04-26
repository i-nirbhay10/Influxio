import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';
import CampaignDetailsScreen from '../screens/CampaignDetailsScreen';
import AICampaignList from '../screens/AICampaignList ';
import FavoritesScreen from '../screens/FavoritesScreen';
import CustomDrawer from './CustomDrawer';
import AboutDeveloperScreen from '../screens/AboutDeveloperScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavs = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CampaignDetailsScreen"
        component={CampaignDetailsScreen}
      />
      <Stack.Screen name="LoginSgreen" component={LoginScreen} />
      <Stack.Screen name="AICampaignList" component={AICampaignList} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // initialRouteName="HOME"
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="HOME" component={StackNavs} />
        <Drawer.Screen name="AICampaignList" component={AICampaignList} />
        <Drawer.Screen name="FavoritesScreen" component={FavoritesScreen} />
        <Drawer.Screen name="AboutDeveloper" component={AboutDeveloperScreen} />
        <Drawer.Screen
          name="CampaignDetailsScreen"
          component={CampaignDetailsScreen}
        />
        <Drawer.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
