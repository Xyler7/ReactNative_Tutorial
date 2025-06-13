import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from 'react-native';

import React, { useState } from 'react';
import {Loading, CustomTextInput, CustomButton} from '../components' ;
import {login} from '../redux/userSlice'

import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../redux/userSlice';

const LoginPage =({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //userSlice içindeki verileri okuma
  // const emailİsim = useSelector((state))=> state.user.email   şeklinde kullanımı da var
  const { isLoading } = useSelector((state)=>state.user)

  //userSlice içindeki reducer yapılarını kullanma ve veri gönderme
  const dispatch = useDispatch()



  return (
    
    <View style={styles.container}>

      <Text style={styles.welcome}>Welcome</Text>

      <Image
      source={require('../../assets/images/login-icon.png')}
      style={styles.image}/>

      <CustomTextInput
        title='Email'
        isSecureText={false}
        handleOnChangeText={(text)=> setEmail(text)}
        handleValue={email}
        handlePlaceholder='Enter Your Email'
      />

      <CustomTextInput
        title='Password'
        isSecureText={true}
        handleOnChangeText={(password)=> setPassword(password)}
        handleValue={password}
        handlePlaceholder='Enter Your Password'
      /> 

      <CustomButton
        buttonText="Login"
        setWidth="80%"
        handleOnPress={()=> dispatch(login({email,password}))}
        buttonColor='blue'
        pressedButtonColor='gray'
      />

      <Pressable onPress={()=>navigation.navigate("Signup")}>
        <Text style={{fontWeight:'bold'}}>Doesn't have an account? Sign Up</Text>
      </Pressable>

        {isLoading
        ? <Loading
          changeIsLoading ={() => dispatch(setIsLoading(false))}/>
        : null }

    </View>

  );
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fbfbfb'
  },

  textStyle:{
    color: "black",
    fontWeight:'bold'
  },
  image:{
    height: 100,
    width: 100,
    marginBottom:20
  },
  welcome:{
    fontWeight:'bold',
    fontSize: 30,
    marginBottom:30,
  },
});
