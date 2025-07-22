import { Pressable, StyleSheet, Text, View, TextInput, FlatList, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import { CustomButton } from '../components';

import { useDispatch, useSelector } from 'react-redux';
import Animated, { BounceIn, FlipInYRight, PinWheel } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { logout } from '../redux/userSlice';
import { setUserInput, saveData, toggleCheck  } from '../redux/dataSlice';




const HomePage = () => {

  const {data, userInput} = useSelector((state) => state.data);
  const dispatch = useDispatch()

  console.log("userInput", userInput)

  //DELETE DATA FROM DATABASE
  const deleteData = async(value) => {
    try {
      await deleteDoc(doc(db, "todolist", value));
      console.log("Delete Succesfull!")
      
      } catch (error) {
        console.log(error)
      }
    }

    //CHANGE ICONS
    const changeIcon = (isChecked) => {
      if (isChecked) {
        return <AntDesign name="checkcircle" size={24} color="black" />
      } else {
        return <Entypo name="circle" size={24} color="black" />
    }
  }

  //LOGOUT
  const handleLogout = ()=>{
    dispatch(logout())
    console.log("Cikis!")
  }

  const handleTextInput = (text) => {
    dispatch(setUserInput(text))
  }

  //RENDER ITEM
const renderItem = ({item, index}) => {
  
  return (
    <Animated.View
      entering={FlipInYRight.delay((index + 1) * 100)}
      style ={styles.flatListContainer}>

        <Pressable
          onPress={() => dispatch(toggleCheck(item.id))}
          style={styles.iconContainer}>
          {changeIcon(item.checked)}
        </Pressable>

        <View style= {styles.itemContainer}> 
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>

          {/* Delete item */}
        <Pressable 
          onPress={() => {deleteData(item.id)}}
          style={styles.iconContainer}>
          <AntDesign name="delete" size={20} color="black" style={{ padding: 5 }} />
        </Pressable>
    </Animated.View>
  )
}

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.Title}>TO DO LIST</Text>

      <Animated.FlatList
        entering={PinWheel}
        style= {styles.flatList}
        data={data}
        keyExtractor={ item => item.id}
        renderItem={renderItem}
      />

      <View style={ styles.userInputContainer}>
        <TextInput
            value ={userInput}
            onChangeText={handleTextInput}
            placeholder='Add To Do'
            style={styles.textInput}
            />
          <CustomButton
          buttonText={"SAVE"}
          flexValue= {1}
          buttonColor={'blue'}
          pressedButtonColor={'gray'}
          handleOnPress={() => dispatch(saveData(userInput))}
          />

      </View>
    </SafeAreaView>
  );
}


export default HomePage

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:70,
    paddingBottom:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor:'#fbfbfb'
  },
  flatListContainer: {
    flex:1,
    borderBottomWidth: 0.3,
    marginVertical:10,
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  flatList: {
    width: '90%',
    padding: 10
  },

  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue'
  },

  itemContainer: {
    flex:1,
    padding: 10,
    marginLeft: 5,
    marginBottom:5,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  userInputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInput: {
    flex: 3,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 5,
    marginRight: 10,
  },
});