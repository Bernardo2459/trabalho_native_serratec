import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Pages/Login/index'
import Home from './Pages/Home'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeEditoras from "./Pages/HomeEditoras";
import HomeEditora from "./Pages/HomeEditora";
import Favoritos from "./Pages/Favoritos";

//Importando o provedor de contexto do DataContext
import { DataProvider } from "./Context/DataContext";

const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () =>{
  return(
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor: '#ffcc00'},
        tabBarLabelStyle:{fontSize: 14},
        tabBarActiveTintColor:'red',
        tabBarInactiveTintColor:'blue'
      }}
    >
      <TabBottomNavigation.Screen name ="HomeTabScreen" component={Home}
      options={{
        title:'Home',
        tabBarIcon:() => (<Ionicons name="home" color='#000' size={24} />)
      }}/>
      <TabBottomNavigation.Screen name ="HomeEditorasTabScreen" component={HomeEditoras}
        options={{
          title:'biblioteca',
          tabBarIcon:() => (<Ionicons name='library' color='#000' size={24} />)
        }}/>
        <TabBottomNavigation.Screen name ="FavoritosTabScreen" component={Favoritos}
      options={{
        title:'Favoritos',
        tabBarIcon:() => (<Ionicons name="heart" color='#000' size={24} />)
      }}/>
    </TabBottomNavigation.Navigator>
  )
}

const Stack = createNativeStackNavigator();

const App = () =>{
  return(
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={Login} options={{title: " " , headerStyle:{backgroundColor: '#54b695'}
           }} />
          <Stack.Screen name="BottomNavigatorScreen" component={BottomNavigator}
          options={{title: "  " , headerStyle:{backgroundColor: '#54b695'}
        }} />
          <Stack.Screen name="HomeEditoraScreen" component={HomeEditora} options={{title: "" , headerStyle:{backgroundColor: '#54b695'}
           }} />
           <Stack.Screen name="FavoritosScreen" component={Favoritos} options={{title: "" , headerStyle:{backgroundColor: '#54b695'}
           }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;