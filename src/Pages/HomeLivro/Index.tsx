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
import { DadosLivroType } from '../../Models/DadosLivroType';

const HomeLivro = ({route, navigation}) =>{
    const {id} = route.params
    const[dadosLivro, setDadosLivro] = useState<DadosLivroType>()

    const {dadosUsuario} = useContext(DataContext)

    const getLivro = async () =>{
        AxiosInstance.get(
            `/livros/${id}`,
            {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
        ).then(resultado =>{
            console.log('Resultado dos dados do livro: ' + JSON.stringify(resultado.data))
            setDadosLivro(resultado.data)
        }).catch((error)=>{
            console.log('Erro ao pegar as informações da api: ' + JSON.stringify(error) )
        })
    }

    useEffect(() =>{
        getLivro()
    },[])
    return(
        <ScrollView>
            <Text>Home Livros {id}</Text>
        </ScrollView>
    )
}

export default HomeLivro