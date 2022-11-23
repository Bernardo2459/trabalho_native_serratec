import React, {createContext, useState} from "react";
import jwt_decode from 'jwt-decode'


//importando DadosUsuarioType
import { DadosUsuarioType } from "../Models/DadosUsuarioType";
import { DadosEditoraType } from "../Models/DadosEditoraType";

//Criando o Contexto
export const DataContext = createContext({});

//Criando o provedor de Contexto
export const DataProvider = ({children}) =>{
    const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioType>()
    const[editoraSelecionada, setEditoraSelecionada] = useState<DadosEditoraType>()

    const armazenaDadosUsuario = (jwt:any) =>{
        var tokenDecodificado: any =jwt_decode(jwt)

        //Armazenando apenas a chave do usuario da string json decodificada
        var usuario = tokenDecodificado.usuario;

        //transformando a string json contida dentro da variavel usuario num objeto javascript
        usuario = JSON.parse(usuario) 

        setDadosUsuario({
            id: usuario?.userId,
            nome: usuario?.usuarioNome,
            email: usuario?.userEmail,
            token: jwt
        })
    }

    return(
        <DataContext.Provider value={{
            dadosUsuario,
            armazenaDadosUsuario,
            // armazenaDadosEditora
        }}>
            {children}
        </DataContext.Provider>
    )
}