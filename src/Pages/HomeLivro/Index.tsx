import axios from 'axios';
import React, { useContext, useEffect, useState, } from 'react';
import AxiosInstance from '../../Api/AxiosInstance';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { DataContext } from '../../Context/DataContext';

const HomeLivro = ({route, navigation}) =>{
    const {id} = route.params

    const {dadosUsuario} = useContext(DataContext)

    const getLivro = async () =>{
        AxiosInstance.get(
            `/livros/${id}`
        )
    }
    return(
        <ScrollView>
            <Text>Home Livros {id}</Text>
        </ScrollView>
    )
}

export default HomeLivro