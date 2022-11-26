import React, { useContext, useEffect, useState, } from 'react';
import AxiosInstance from '../../Api/AxiosInstance';
import {
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card } from 'react-native-paper';
import { DadosEditoraType } from '../../Models/DadosEditoraType';
import { DataContext } from '../../Context/DataContext';


const Item = ({item, eventoPressionarBotao}) =>{
  return(
    <TouchableOpacity style={styles.btnItem}>

    <Image source={{uri: item.urlImagem}} resizeMode = 'contain' style={styles.imgItem} />
    <Text>{item.nomeEditora}</Text>
  </TouchableOpacity>
  )
}



const HomeEditoras = ({navigation}) =>{


  const [selectedId, setSelectedId] = useState(null)
  const {dadosUsuario} = useContext(DataContext)
  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([])
  const [loading, setLoading] = useState(false)

  const getAllEditoras = async () =>{
    setLoading(true)
    AxiosInstance.get(
      '/editoras',
      {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then(resultado =>{
      console.log('Resultado: ' + JSON.stringify(resultado.data))
      setDadosEditora(resultado.data)
      if(resultado.status === 200){
        setLoading(false)
      }
    }
    ).catch((error) =>{
      console.log('Ocorreu um erro ao recuperar o dados da editora: ' + JSON.stringify(error))
      setLoading(false)
    })
  }

  const navigateToEditoraHome = (id:any) => {
    setSelectedId(id);

    navigation.navigate('HomeEditora', {id:id});
  }

  const CardEditora = ({ item, navigation }) => {
    return(
    <Card style={styles.cardEditora}>
      <Card.Title title={item.nomeEditora} />
      <TouchableOpacity onPress={()=> navigateToEditoraHome(item.codigoEditora)}>
      <Card.Cover source={{uri: item.urlImagem}} />
      </TouchableOpacity>
      <Card.Actions style={{justifyContent:'center'}}>
      </Card.Actions>
    </Card>
    );
  }

  useEffect(() =>{
    getAllEditoras()
  },[])

    return(
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
        size="large"
        color={"blue"}
        animating={true}
        style={styles.load}
        />
      ) : (
        <FlatList 
        data={dadosEditora}
        renderItem={CardEditora}
        keyExtractor={(item:any)=> item.codigoEditora}
        />)}
    </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom:StatusBar.currentHeight || 0
    
  },
  load:{
    marginTop: 100,
    alignContent:'center',
    display:'flex',
    justifyContent:'flex-end'
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
    width:100, 
    height:100,
  },
  cardEditora: {
    marginHorizontal: 8,
    marginBottom:8,
    padding:10,
    justifyContent:'center',
    
  },
})

export default HomeEditoras;