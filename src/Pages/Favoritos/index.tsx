import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DadosLivroType } from '../../Models/DadosLivroType';
import { retrieveLocalData, storeLocalData } from '../../Service/StorageLocalService';

const Favoritos = () =>{

    const [livro, setlivro] = useState()
    const [dadosLivros, setDadosLivros ] = useState<DadosLivroType[]>([])

    const exibirFavoritos = storeLocalData.bind

    const exibirDadosfavoritos = (livro:DadosLivroType) =>{
        retrieveLocalData(livro)
    }
    
    return(
        <View>
        <Text style ={styles.Text}>Favorite Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    Text: {
        justifyContent:'center',
        flexDirection:"row",
        alignItems:'center',
    }
})

export default Favoritos;