import React, { useContext, useEffect, useState, } from 'react';
import AxiosInstance from '../../Api/AxiosInstance';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { DataContext } from '../../Context/DataContext';
import { DadosLivroType } from '../../Models/DadosLivroType';
import { incrementLocalData } from '../../Service/StorageLocalService';

const HomeLivro = ({route, navigation,}) =>{
    const {id} = route.params

    console.log(id)
    const {dadosUsuario} = useContext(DataContext)
    const[dadosLivro, setDadosLivro] = useState<DadosLivroType>()
    const [loading,  setLoading] = useState(false)

    const getLivro = async () =>{
        setLoading(true)
        AxiosInstance.get(
            `/livros/${id}`,
            {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
        ).then(resultado =>{
            console.log('Resultado dos dados do livro: ' + JSON.stringify(resultado.data))
            setDadosLivro(resultado.data)
            if(resultado.status === 200){
                setLoading(false)
            }
        }).catch((error)=>{
            console.log('Erro ao pegar as informações da api: ' + JSON.stringify(error))
            setLoading(false)
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
    return(
        <SafeAreaView>
           {loading ? (
            <SafeAreaView style={styles.container}>
            <ActivityIndicator
            size="large"
            color={"blue"}
            animating={true}
            style={{alignSelf:'center', 
            justifyContent:'center', 
            alignContent:'center',
            position:'absolute'}}
            />
            </SafeAreaView>
           ) : (
            <Card style={styles.container} key={`livro.details${dadosLivro?.codigoLivro}`}>
                <Card.Title title={dadosLivro?.nomeLivro} subtitle={dadosLivro?.dataLancamento} />
                <Card.Cover source={{uri: dadosLivro?.urlImagem}} />
                <Card.Actions>
                <Button onPress={() => addFavorite(dadosLivro)}>Favoritar</Button>
                <Button>Comprar</Button>
                </Card.Actions>
            </Card>)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
    height:500,
    display:'flex',
    justifyContent:'center',
    alignContent:'center'
    },
    descricao:{
    fontSize:20
    }
})
export default HomeLivro