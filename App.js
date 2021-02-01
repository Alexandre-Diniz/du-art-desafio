import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native'

import api from './src/api'

const App = () => {
  const [token, setToken] = useState('')
  const [pergunta, setPergunta] = useState('')
  const [resposta, setResposta] = useState('')
  const [email, setEmail] = useState('')

  const getToken = async () => {
    try {
      let response = await api.post('/', {
        email
      },{
        headers:{}
      })
      setToken(response.data.token)
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getQuestion = async () => {
    try {
      let response = await api.post('/', {
        token
      })
      setPergunta(response.data.pergunta)
    } catch (error) {
      console.log(error)
    }
  }

  const sendAnswer = async () => {
    try {
      let response = await api.post('/', {
        token,
        resposta
      })
      setPergunta(response.data.pergunta)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          width: '100%',
          paddingVertical: 10
        }}
      >
        <Text
          style={styles.commonText}
        >E-mail</Text>
        <TextInput
          value={email}
          onChangeText={email => setEmail(email)}
          placeholder='Insira seu email'
          style={[styles.textInput]}
        />
        <TouchableOpacity
          style={[styles.button]}
          onPress={getToken}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff'
            }}
          >ENVIAR E-MAIL</Text>
        </TouchableOpacity>
      </View>

      <View
        style={styles.line}
      />

      {
        token === '' ?
          null :
          <View>
            <TouchableOpacity
              style={[styles.button]}
              onPress={getQuestion}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >RECEBER PERGUNTA</Text>
            </TouchableOpacity>

            <View
              style={styles.line}
            />

            <Text style={{
              fontWeight: 'bold',
              color: '#000',
              width: '90%',
              marginLeft: '5%',
              marginBottom: 10
            }} >{pergunta}</Text>

            <TextInput
              value={resposta}
              onChangeText={resposta => setResposta(resposta)}
              placeholder='Insira sua resposta'
              style={[styles.textInput]}
            />
            <TouchableOpacity
              style={[styles.button]}
              onPress={sendAnswer}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >ENVIAR RESPOSTA</Text>
            </TouchableOpacity>
          </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    marginLeft: '5%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    width: '90%',
    marginLeft: '5%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginTop: 20
  },
  commonText: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 20,
    marginBottom: 2
  },
  line: {
    width: '90%',
    marginLeft: '5%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 20
  }
})

export default App;
