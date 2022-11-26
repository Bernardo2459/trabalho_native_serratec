import React, {useState} from "react";
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
import HomeLivro from "./Pages/HomeLivro/Index";
import Favoritos from "./Pages/Favoritos";

const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () =>{
  return(
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor: '#182747'},
        tabBarActiveTintColor:'#fff',
        tabBarInactiveTintColor:'#dd1a1a',
      }}
    >
        <TabBottomNavigation.Screen name ="HomeTabScreen" component={Home}
      options={{
        title:'Home',
        tabBarIcon:({focused}) => (<Ionicons name="home" color={focused?"#fff":"#dd1a1a"} size={24} />)
      }}/>
      <TabBottomNavigation.Screen name="Favoritos" component={Favoritos} 
      options={{
        title:'Favoritos',
        tabBarIcon:({focused}) => (<Ionicons name= 'heart-outline' color={focused?"#fff":"#dd1a1a"} size={24} />)
      }}
      />
      <TabBottomNavigation.Screen name ="HomeEditorasTabScreen" component={HomeEditoras}
        options={{
          title:'Editoras',
          tabBarIcon:({focused}) => (<Ionicons name='library' color={focused?"#fff":"#dd1a1a"} size={24} />)
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
          options={{title: "  " , headerStyle:{backgroundColor: '#182747'}
        }} />
          <Stack.Screen name="Login" component={Login} options={{title: " " , headerShown: false}} />
          <Stack.Screen name="HomeEditora" component={HomeEditora} options={{title: "Livros da Editora" , headerStyle:{backgroundColor: '#182747'}
           }} />
           <Stack.Screen name="HomeLivro" component={HomeLivro} options={{title: "Livro" , headerStyle:{backgroundColor: '#182747'}
           }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}