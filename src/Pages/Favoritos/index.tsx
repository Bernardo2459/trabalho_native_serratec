import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
// import { DadosLivroType } from '../../Models/DadosLivroType';
import { storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData } from '../../services/LocalStorageService';

const Item = ({ item, eventoPressionarBotao }) => (
    <View>
        <Text>Hello</Text>
    </View>
//   <TouchableOpacity onPress={eventoPressionarBotao} 
//       style={styles.btnItem}
//   >
//     <Image source={{uri: item.urlImagem}} resizeMode='contain' style={styles.imgItem} />    
//     <Text style={[styles.title]}>{item.nomeEditora}</Text>
//   </TouchableOpacity>
);

const Favoritos = () =>{
    var actualData:any = null;
    var data = [];
    
    const handleFavoritos = async () => {
        
        //await clearStorage(); //limpa todos os dados atuais da key especificada. Usar para fins de teste
        try {
          //recupera os dados da key existentes atualmente
          actualData = await retrieveLocalData('favoritos');
          //converte os dados, de JSON para objeto Javascript
          actualData = JSON.parse(actualData);
          //console.log(`actualData: ${JSON.stringify(actualData, null, '\t')}`);
    
          if (actualData !== null) {
            //armazena os dados existentes atualmente no array data
            data.push(actualData);
    
            //transforma os dados recebidos pelo metodo num objeto JS
            // value = JSON.parse(JSON.stringify(value))

            //adiciona os novos dados, recebidos, no array data, incrementando-os aos existentes atualmente
            // data.push(value);
    
          } else{
            //quando chamado pela primeira vez, caso nao exista ainda dados pra key, os armazena
            console.log("Não há favoritos")
            // storeLocalData(key, value);
          }
        } catch (error) {
            console.log(`${error}`)
            //console.log(`Erro ao recuperar dados (key: ${key}) do LocalStorage: ${error}`);
        }
    }

    useEffect(() => {
        handleFavoritos();
    //   retrieveLocalData('favoritos');
    },[]);

    return(
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.codigoLivro}
      />
    </View>
    )
}

    const renderItem = ({ item }) => {
      return (
        <Item
          item={item.nomeLivro}
        //   eventoPressionarBotao={() => navigateToEditoraHome(item.codigoEditora)}
        />
      );
    };
    
const styles = StyleSheet.create ({
    Text: {
        justifyContent:'center',
        flexDirection:"row",
        alignItems:'center',
    },
})

export default Favoritos;