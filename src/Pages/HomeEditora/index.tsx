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

    const {dadosUsuario}=useContext(DataContext)
    const [dadosEditora, setDadosEditora] = useState<DadosEditoraType>()


  const getEditora = async () =>{
    AxiosInstance.get(
      `/editoras/${id}`,
      {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then(resultado=>{
      console.log('Resultado: ' + JSON.stringify(resultado.data))
      setDadosEditora(resultado.data)
    }).catch((error)=>{
      console.log('Falha ao achar dados da editora: ' + JSON.stringify(error))
    })
  }

  useEffect(() => {
    getEditora()
  })

    console.log(id)
    return(
    <View>
        <Text>Home Editoras {id}</Text>
    </View>
    )
    
}

export default HomeEditora;