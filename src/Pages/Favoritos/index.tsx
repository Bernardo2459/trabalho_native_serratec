import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DadosLivroType } from '../../Models/DadosLivroType';
import { storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData } from '../../service/LocalStorageService'

const Favoritos = () =>{

    const [livro, setlivro] = useState()

    const exibirFavoritos = storeLocalData.bind.
    
    return(
        <View>
        <Text>Favorite Screen</Text>
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