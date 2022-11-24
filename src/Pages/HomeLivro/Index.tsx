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
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { incrementLocalData } from '../../Service/StorageLocalService';

const HomeLivro = ({route, navigation,}) =>{
    const {id} = route.params

    console.log(id)
    const {dadosUsuario} = useContext(DataContext)
    const[dadosLivro, setDadosLivro] = useState<DadosLivroType>()

    const getLivro = async () =>{
        AxiosInstance.get(
            `/livros/${id}`,
            {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
        ).then(resultado =>{
            console.log('Resultado dos dados do livro: ' + JSON.stringify(resultado.data))
            setDadosLivro(resultado.data)
        }).catch((error)=>{
            console.log('Erro ao pegar as informações da api: ' + JSON.stringify(error))
        })
    }

    const addFavorite = (dadosLivro: DadosLivroType) =>{

        incrementLocalData('favoritos', dadosLivro)
    }

    useEffect(() =>{
        getLivro()
    },[])

 const CardLivro = ({item}) => {
    return(
    <Card>
      <Card.Title title={item.nomeLivro} />
      <Card.Cover source={{uri: item.urlImagem}} />
      <Card.Actions style={{justifyContent:'center'}}>
      </Card.Actions>
    </Card>
    );
  }

  const renderItem = () =>{
    <View>
        <Text> render </Text>
    </View>
  }
    return(
        <SafeAreaView>
            <Card style={styles.container} key={`livro.details${dadosLivro?.codigoLivro}`}>
                <Card.Title title={dadosLivro?.nomeLivro} subtitle={dadosLivro?.dataLancamento} />
                <Card.Cover source={{uri: dadosLivro?.urlImagem}} />
                <Card.Actions>
                <Button onPress={() => addFavorite(dadosLivro)}>Favoritar</Button>
                <Button onPress={() => addCart(dadosLivro.codigoLivro)}>Comprar</Button>
                </Card.Actions>
            </Card>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})
export default HomeLivro