import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import React from 'react'

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <Pressable
      onPress= {()=> props.changeIsLoading()}
      style={[{}, styles.closeButtonContainer]}>
          <Text style={styles.closeButton}>X</Text>
      </Pressable>
      
      <ActivityIndicator size={'large'} color={'red'}/>
      <Text style={styles.loginText}>Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    position:'absolute',
    backgroundColor:'tomato',
    alignItems:'center',
    justifyContent:'center'
  },

  loginText:{
    fontWeight:'bold',
    fontSize:16,
    color:'white',
    marginTop:20,
  },
  closeButton:{
    color:'white',
    fontWeight:'bold',
    fontSize:16,
  },
  closeButtonContainer:{
    backgroundColor:'black',
    width:50,
    height:50,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:50,
    right:30,
  }

})