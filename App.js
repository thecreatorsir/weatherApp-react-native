import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feather } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from "./components/SearchScreen"
import HomeScreen from "./components/HomeScreen"
const Tab = createMaterialBottomTabNavigator();
export default class App extends React.Component {  
    
  render(){
    return (
      <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="grey"
      shifting={true}
      >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarLabel: 'Current City',
        tabBarColor: 'blue',
        tabBarIcon: ({ color }) => (
          <Feather name="cloud" size={24} color={color} />
        ),
      }}
      />
      <Tab.Screen name="Search" component={SearchScreen} 
      options={{
        tabBarLabel: 'Search City',
        tabBarColor: 'green',
        tabBarIcon: ({ color }) => (
          <Feather name="search" size={24} color={color} />
        ),
      }}
      />
    </Tab.Navigator>
    </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
});
