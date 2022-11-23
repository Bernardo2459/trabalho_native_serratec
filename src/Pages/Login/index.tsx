import React, { useContext, useEffect, useState, } from 'react';
import AxiosInstance from '../../Api/AxiosInstance';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';

import { styles } from './style';

//Importando o DataContext
import { DataContext } from '../../Context/DataContext';

const Login =  ({navigation}) => {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  const {armazenaDadosUsuario} = useContext(DataContext)

  const Stack = createNativeStackNavigator();

  const handleLogin = async () =>{
    console.log(`Email: ${email} - Senha: ${senha}`)
    var tokenJwt:any = null
    setLoading(true)
    
    try{
      const retorno = await AxiosInstance.post('/auth/login', {
        email:email,
        password:senha
      })


      if(retorno.status === 200){
        console.log('Retorno: ' + JSON.stringify(retorno.data) )
        setLoading(false)
        
        tokenJwt = retorno.data

        armazenaDadosUsuario(tokenJwt["jwt-token"])

        navigation.navigate('BottomNavigatorScreen')

      }else{
        console.log('Erro ao relaizar a autentificação')
        setLoading(false)
      }

    } catch (error){
        Alert.alert('Usuário/Senha errado(s)', 'Tente novamente', [
          {
            text: 'Cadastrar',
            onPress: () => console.log('Cadastrar Pressed'),
            style: 'cancel',
          },
          { 
            text: 'Tentar novamente', 
            onPress: () => console.log('novamente Pressed') },
        ]);
      console.log('Erro ao realizar a autentificação -' + JSON.stringify(error))
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Bem-Vindo</Text>
      </View>

      <View style={styles.conteudo}>

        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder='E-mail' />
        <TextInput style={styles.input} onChangeText={setSenha} value={senha} placeholder='Senha' secureTextEntry={true} />

      </View>

      <View style={styles.rodape}>
        {!loading ?(
          <>
          <TouchableOpacity style={styles.botao} onPress={() => handleLogin()}>
            <Text style={styles.textoBotao}>Login</Text>
          </TouchableOpacity>
          </>
        ) : (
          <ActivityIndicator
          size="large"
          color={"blue"}
          animating={true}
          style={{alignSelf:'center', 
          justifyContent:'center', 
          position:'absolute'}}
          />
          
        )}
      </View>
      
    </View>
  );
};

export default Login;