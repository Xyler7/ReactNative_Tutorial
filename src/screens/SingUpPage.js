import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from 'react-native'
import React, {useState} from 'react'
import { CustomTextInput, CustomButton } from '../components'


const SingUpPage = ({navigation}) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  return (

    <SafeAreaView style={styles.container}>

        <View style={styles.title}> 
          
        </View>


      <View style={styles.TextInputContainer}>

          <CustomTextInput
            title='Name'
            handlePlaceholder="Enter Your Name"
            isSecureText={false}
            handleOnChangeText={setName}
            handleValue={name}
          />

          <CustomTextInput
            title='Email'
            handlePlaceholder="Enter Your Email"
            isSecureText={false}
            handleOnChangeText={setEmail}
            handleValue={email}
          />

          <CustomTextInput
            title='Password'
            handlePlaceholder="Create Your Password"
            isSecureText={true}
            handleOnChangeText={setPassword}
            handleValue={password}
          />

      
      </View>

      <View style={styles.signupOptions}>
        <CustomButton
          buttonText='Sign Up'
          setWidth="80%"
          buttonColor="blue"
          pressedButtonColor="lightgray"
          handleOnPress={()=> console.log(name, " " , email, " ", password )}
        />

        <Pressable onPress={()=>navigation.navigate("Login")}>
          <Text style={{fontWeight:'bold'}}>Already have an account? Login</Text>
        </Pressable>
      </View>

      

    </SafeAreaView>
  )
}

export default SingUpPage

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  SignUp:{
    fontWeight:'bold',
    fontSize: 30,
    marginBottom:30,
  },

  title:{
    flex:2,
    paddingTop:40,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },

  TextInputContainer:{
    flex:2,
    paddingVertical:20,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
  },
  
  signupOptions:{
    flex:3,
    paddingBottom:40,
    width:"100%",
    alignItems:'center',
    justifyContent:'space-between'
  },
  image:{
    height: 80,
    width: 80,
    marginBottom:20
  },
})