import axios from 'axios';
import React, { useContext, useEffect, useState, } from 'react';
import AxiosInstance from '../../Api/AxiosInstance';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  
} from 'react-native';

//Import do DataContext
import { DataContext } from '../../Context/DataContext';

import { DadosEditoraType } from '../../Models/DadosEditoraType';
import { NavigationContainer } from '@react-navigation/native';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.nomeEditora}</Text>
  </TouchableOpacity>
);

const Home = ({navigation}) =>{
  
  const {dadosUsuario} = useContext(DataContext)
  const[dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
  const [selectedId, setSelectedId] = useState(null)
  useEffect(() =>{
    getAllEditoras();
  },[]) 

  const getAllEditoras = async () =>{
    AxiosInstance.get(
    '/editoras',
    {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then( resultado =>{
      console.log('Dados das Editoras' + JSON.stringify(resultado.data))
      setDadosEditora(resultado.data)
    }).catch((error)=>{
      console.log('Ocorreu um erro ao recuperar os dados da editora' + JSON.stringify(error))
    })
  }

  const navigateToEditoraHome = (id:any)=>{
    setSelectedId(id)
    navigation.navigate('HomeEditora', {id:id})
  }
  const renderItem = ({ item }) => {
    const backgroundColor = item.codigoEditora === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.codigoEditora === selectedId ? 'white' : 'black';

    return (
      <Item 
        item={item}  
        onPress={() => navigateToEditoraHome(item.codigoEditora)}
        backgroundColor={{ backgroundColor }} 
        textColor={{ color }}
      />
    );
  };

  return(
    <View>
      <FlatList 
      data={dadosEditora}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item) => item.codigoEditora}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginHorizontal: 8,
    width:120,
    justifyContent:'center',
  },
  title: {
    fontSize: 32,
  },
});

export default Home