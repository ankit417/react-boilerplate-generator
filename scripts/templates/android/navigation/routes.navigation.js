import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {NavigationContainer, DefaultTheme,useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors, fonts, normalize} from '../modules';
const {width: wWidth} = Dimensions.get('window');


// NAVIGATORS
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// SAMPLE SCREEN
const SampleScreen = () => {
  return (
    <View>
      <Text>Sample Screen</Text>
    </View>
  );
};

const Home = createStackNavigator();
function HomeStack() {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Home.Screen name="home" component={SampleScreen} />
    </Home.Navigator>
  );
}




// THEME PROVIDER
const theme = {
  dark: DefaultTheme.dark,
  colors: {
    ...DefaultTheme.colors,
    background: colors.light.backgroundColor,
  },
};

export const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer {...{theme}}>
        <HomeStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
