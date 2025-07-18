import { StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'
import Animated, {FadeIn} from 'react-native-reanimated'

const CustomButton = ({buttonText, flexValue, handleOnPress, buttonColor, pressedButtonColor}) => {
  

  return (
    <Pressable
          onPress={()=> handleOnPress()}
          style={({pressed}) =>   [{
            
            backgroundColor: pressed ? pressedButtonColor : buttonColor,
            flex: flexValue,    
          },styles.SaveButton]}>
    
            <Text style={styles.SaveButtonText}>{buttonText}</Text>
    
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    SaveButton:{
    borderWidth:0.5,
    height:50,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },

  SaveButtonText:{
    fontWeight:'bold',
    color:'white'
  },
})