import React, {useState, useEffect} from 'react';
import {  View, StyleSheet, FlatList } from 'react-native';
import { DadosLivroType } from '../../Models/DadosLivroType';
import { storeLocalData, retrieveLocalData } from '../../Service/StorageLocalService';
import { Button, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'

const CardLivro = ({ item }) => {
  return(
  <Card style={styles.cardLivro}>
    <Card.Title title={item?.nomeLivro}  />
    <Card.Cover source={{uri: item?.urlImagem}} />
    <Card.Actions style={{justifyContent:'center'}}>
      <Button onPress={() => removeFromFavoritosByKeyAndValue('favoritos', item.codigoLivro)}><Ionicons name='trash-outline' color='#000' size={36} /></Button>
    </Card.Actions>
  </Card>
  );
}

const removeFromFavoritosByKeyAndValue = async (key:string, codigoLivro:any) =>{
  var arrayJsonFavoritos:any = null;
  var arrayJsFavoritos = [];
  var arrayJsAlteradoFavoritos = [];
  try {
    arrayJsonFavoritos = await retrieveLocalData(key);
    arrayJsFavoritos = JSON.parse(arrayJsonFavoritos);

    arrayJsAlteradoFavoritos = arrayJsFavoritos.filter(function(e){
      return e.codigoLivro !== codigoLivro;
    })

    storeLocalData(key, arrayJsAlteradoFavoritos);
  } catch (error) {
    console.log(`Erro ao remover dados (key: ${key}) com a valor do codigo do livro ${codigoLivro} do LocalStorage: ${error}`);
  }
}

const Favoritos = () =>{
    var actualData:any = null;
    var [data, setData] = useState<DadosLivroType[]>([]);
    
    const handleFavoritos = async () => {
        try {
          
          actualData = await retrieveLocalData('favoritos');
          
          actualData = JSON.parse(actualData);
          
          if (actualData !==undefined && actualData !== null) {
           
            setData(actualData);
           
          } else{
           
            console.log("Não há favoritos")
           
          }
        } catch (error) {
            console.log(`${error}`)
           
        }
    }

    useEffect(() => {
        handleFavoritos();
    },[data]);

    return(
    <View>
      <FlatList
        data={data}
        renderItem={CardLivro}
        keyExtractor={(item, indice) => indice}
        horizontal={false}
      />
    </View>
    )
}
    
const styles = StyleSheet.create ({
    Text: {
        justifyContent:'center',
        flexDirection:"row",
        alignItems:'center',
    },
    item: {
      marginHorizontal: 8,
      marginBottom:20,
      padding:10,
      width:200,
      height:200,
      justifyContent:'center',
      flexDirection:"row",
      alignItems:'center',
    },
    cardLivro: {
      marginHorizontal: 8,
      padding:10,
      justifyContent:'center',
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
      width:140, 
      height:140
    }
})

export default Favoritos;