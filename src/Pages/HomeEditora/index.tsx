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
import Ionicons from 'react-native-vector-icons/Ionicons'

import { DataContext } from '../../Context/DataContext';

import { DadosEditoraType } from '../../Models/DadosEditoraType';
import { DadosLivroType } from '../../Models/DadosLivroType';

const Item = ({item}) =>{
  return(
    <TouchableOpacity>
    <Image source={{uri: item.urlImagem}}  />
    <Text>{item.nomeEditora}</Text>
  </TouchableOpacity>
  )
}

const addFavorite = (livro:DadosLivroType) => {
  //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
  incrementLocalData('favoritos', livro);
}

const addCart = (id:number) => {
  console.log(`Carrinho: Livro selecionado: ${id}`);
}

const HomeEditora = ({route, navigation,}) =>{
    const{id} = route.params
    

    const {dadosUsuario}=useContext(DataContext)
    const [selectedLivro, setSelectedLivro] = useState(null)
    const [selectedId, setSelectedId] = useState(null)
    const [dadosEditora, setDadosEditora] = useState<DadosEditoraType>()
    const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([])

    const navigateToHomeLivro = (id:any) =>{
      setSelectedId(id)

      navigation.navigate('HomeLivro', {id:id})
    }

    const CardLivro = ({item}) =>{
      return(
        <Card style={styles.cardLivro}>
          <Card.Title title={item.nomeLivro} />
          <TouchableOpacity onPress={() => navigateToHomeLivro(item.codigoLivro)}>
          <Card.Cover  source={{uri: item.urlImagem}} />
          </TouchableOpacity>
          <Card.Actions style={{justifyContent:'center'}}>
            <Button onPress={() => addFavorite(item)}><Ionicons name='heart-circle' color='#000' size={36} /></Button>
            <Button onPress={() => addCart(item.codigoLivro)}><Ionicons name='cart' color='#000' size={36} /></Button> 
          </Card.Actions>
        </Card>
        );
    }

    const getEditora = async () =>{
      AxiosInstance.get(
        `/editoras/${id}`,
        {headers: {"Authorization": `Bearer ${dadosUsuario?.token}`}}
      ).then(resultado =>{
        console.log('Resultado dados editora: ' + JSON.stringify(resultado.data))
        setDadosEditora(resultado.data)
      }).catch((error)=>{
        console.log('Erro ao achar os dados de editora: ' + JSON.stringify(error))
      })
    }
    const getLivros = async () =>{
      AxiosInstance.get(
        `/livros/por-editora/${id}`,
        {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
      ).then(resultado=>{
        console.log('Resultado dados do livro: ' + JSON.stringify(resultado.data))
        setDadosLivro(resultado.data)
      }).catch((error)=>{
        console.log('Falha ao achar dados da editora: ' + JSON.stringify(error))
      })
    }

    const renderItem = ({item}) =>{
      return(
        <Item 
        item={item}
        />
      )
    }

  useEffect(() => {
    getLivros()
    getEditora()
  },[])

    return(
    <ScrollView>
      <Text> {id} </Text>
      <FlatList 
      data={dadosLivro}
      renderItem={CardLivro}
      keyExtractor={(item, indicie)=> indicie}
      extraData={setSelectedLivro}
      />
    </ScrollView>
    )
    
}

const styles = StyleSheet.create({
  cardLivro:{
    marginHorizontal: 8,
    padding:10,
    justifyContent:'center',
  }
})

export default HomeEditora;