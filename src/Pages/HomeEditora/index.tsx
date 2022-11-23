import axios from 'axios';
import React, { useContext, useEffect, useState, } from 'react';
import AxiosInstance from '../../Api/AxiosInstance';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Button
} from 'react-native';

import { DataContext } from '../../Context/DataContext';

import { DadosEditoraType } from '../../Models/DadosEditoraType';

const HomeEditora = ({route, navigation}) =>{
    const{id} = route.params

    console.log(id)
    return(
    <View>
        <Text>Home Editoras {id}</Text>
    </View>
    )
    
}

export default HomeEditora;