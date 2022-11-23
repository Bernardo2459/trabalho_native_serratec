import React from "react";
import Login from './Pages/Login/index'
import Home from './Pages/Home'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from "./Context/DataContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeEditoras from "./Pages/HomeEditoras";
import HomeEditora from "./Pages/HomeEditora";

const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () =>{
  return(
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor: '#ffcc00'},
        tabBarActiveTintColor:'red',
        tabBarInactiveTintColor:'blue'
      }}
    >
      <TabBottomNavigation.Screen name ="HomeTabScreen" component={Home}
      options={{
        title:'Home',
        tabBarIcon:() => (<Ionicons name='home' coloe='#000' size={24} />)
      }}/>
      <TabBottomNavigation.Screen name ="HomeEditorasTabScreen" component={HomeEditoras}
        options={{
          title:'',
          tabBarIcon:() => (<Ionicons name='library' coloe='#000' size={24} />)
        }}/>
    </TabBottomNavigation.Navigator>
  )
}

const Stack = createNativeStackNavigator();

export default () =>{
  return(
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="BottomNavigatorScreen" component={BottomNavigator}
          options={{title: "  " , headerStyle:{backgroundColor: '#54b695'}
        }} />
          <Stack.Screen name="Login" component={Login} options={{title: " " , headerStyle:{backgroundColor: '#54b695'}
           }} />
          <Stack.Screen name="HomeEditora" component={HomeEditora} options={{title: "" , headerStyle:{backgroundColor: '#54b695'}
           }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}