import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  View,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Card} from 'react-native-paper';

import AxiosInstance from '../../Api/AxiosInstance';


import { DataContext } from '../../Context/DataContext';
import { DadosEditoraType } from '../../Models/DadosEditoraType';
import { DadosLivroType } from '../../Models/DadosLivroType';
import { incrementLocalData } from '../../Service/StorageLocalService';

const Item = ({ item, eventoPressionarBotao }) => (
  <TouchableOpacity onPress={eventoPressionarBotao} 
      style={styles.btnItem}
  >
    <Image source={{uri: item.urlImagem}} resizeMode='contain' style={styles.imgItem} />    
    <Text style={[styles.title]}>{item.nomeEditora}</Text>
  </TouchableOpacity>
);


const addFavorite = (livro:DadosLivroType) => {
  incrementLocalData('favoritos', livro);
}

const addCart = (id:number) => {
  console.log(`Carrinho: Livro selecionado: ${id}`);
}

const Home = ({navigation}) => {

  const {dadosUsuario} = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
  const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedNome, setSelectedNome] = useState(null)
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stackNavigator = navigation.getParent();
    if(stackNavigator){
      stackNavigator.setOptions({ title: `Bem-vindo, ${dadosUsuario.nome}`});
    }
    getAllEditoras();
    getAllLivros();
  },[]);

  const getAllEditoras = async () => {
    setLoading(true)
    AxiosInstance.get(
      '/editoras',
      {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then( resultado => {
      console.log('Dados das Editoras: ' + JSON.stringify(resultado.data));
      setDadosEditora(resultado.data);
      if(resultado.status === 200) {
        setLoading(false)
      }
    }).catch((error) => {
      console.log('Ocorreu um erro ao recuperar os dados das Editoras: ' + JSON.stringify(error));
    });
  }

  const getAllLivros = async () => {
    setLoading(true)
    AxiosInstance.get(
      '/livros',
      {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then( resultado => {
      setDadosLivro([]);
      setLoading(false)
      let arrayLivros = resultado.data;
      arrayLivros.map(key => (
        setDadosLivro(current => [...current, {
          codigoLivro: key.codigoLivro,
          nomeLivro: key.nomeLivro,
          dataLancamento: key.dataLancamento,
          codigoIsbn: key.codigoIsbn,
          nomeImagem: key.nomeImagem,
          nomeArquivoImagem: key.nomeArquivoImagem,
          urlImagem: key.urlImagem,
          editora: {
            codigoEditora: key.editoraDTO.codigoEditora,
            nomeEditora: key.editoraDTO.nomeEditora,
          },
          autor: {
            codigoAutor: key.autorDTO.codigoAutor,
            nomeAutor: key.autorDTO.nomeAutor,
          }
        }])
      ));
    }).catch((error) => {
      console.log('Ocorreu um erro ao recuperar os dados dos Livros: ' + JSON.stringify(error));
    });
  }

  const navigateToEditoraHome = (id:any, nomeEditora:any) => {
    setSelectedId(id);

    navigation.navigate('HomeEditora', {id:id});
  }

  const navigateToHomeLivro = (id:any) =>{
    setSelectedId(id)

    navigation.navigate('HomeLivro', {id:id})
  }

  const CardLivro = ({ item }) => {
    return(
    <Card style={styles.cardLivro}>
      <Card.Title title={item.nomeLivro} subtitle={item.editora.nomeEditora} />
      <TouchableOpacity onPress={() => navigateToHomeLivro(item.codigoLivro)}>
      <View style={styles.imgCard}>
      <Card.Cover source={{uri: item.urlImagem}} style={styles.imgCard} />
      </View>
      </TouchableOpacity>
      <Card.Actions style={{justifyContent:'center'}}>
        <Button onPress={() => addFavorite(item)}><Ionicons name='heart-circle' color='#000' size={36} /></Button>
        <Button onPress={() => addCart(item.codigoLivro)}><Ionicons name='cart' color='#000' size={36} /></Button>
      </Card.Actions>
      
    </Card>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item} 
        eventoPressionarBotao={() => navigateToEditoraHome(item.codigoEditora)}
      />
    );
  };

  return(
    <ScrollView>
      {!loading ? (
        <FlatList 
        data={dadosEditora}
        renderItem={renderItem}
        keyExtractor={(item) => item.codigoEditora}
        extraData={selectedId}
        horizontal={true}
        />
      ) : (
        <ActivityIndicator 
          size="large"
          color={"blue"}
          animating={true}
          style={styles.load1}
          />
      )} 
      {!loading ? (
        <FlatList 
        data={dadosLivro}
        renderItem={CardLivro}
        keyExtractor={(item, indice) => indice}
        extraData={setSelectedLivro}
        horizontal={true}
        />
      ) : (
        <ActivityIndicator 
          size="large"
          color={"blue"}
          animating={true}
          style={styles.load2}
          />
      )}
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  load1:{
    marginTop: 100,
    alignContent:'center',
    display:'flex',
    justifyContent:'flex-end'
  },
  load2:{
    marginTop: 300,
    alignContent:'center',
    display:'flex',
    justifyContent:'flex-end'
  },
  item: {
    marginHorizontal: 8,
    marginBottom:20,
    padding:10,
    width:200,
    height:200,
    borderRadius:40,
    backgroundColor:'#000',
    justifyContent:'center',
    flexDirection:"row",
    alignItems:'center',
  },
  cardLivro: {
    marginHorizontal: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems:'center',
    margin: 20,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
    elevation: 5,
    shadowColor: '#000',
    width: 250,
  },
  sectionTitle: {
    fontSize: 24,
    marginLeft: 10,
    marginBottom:6,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 14,
    flex:.8
  },
  btnItem:{
    flexDirection:"column",
    alignItems:'center',
    justifyContent:'center', 
    width:200, 
    height:200, 
    marginBottom: 60
  },
  imgItem:{
    flex:3, 
    width:200, 
    height:100,
  },
  imgCard:{
    height:200,
    resizeMode:'center'
  }
});

export default Home;