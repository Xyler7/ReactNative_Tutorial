import { Pressable, StyleSheet, Text, View, TextInput, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import { CustomButton } from '../components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import Animated, { BounceIn, FlipInYRight, PinWheel } from 'react-native-reanimated';


const HomePage = () => {

  const [data, setData] = useState([])
  const[isSaved, setIsSaved] =useState(false)
  const [updateTheData, setUpdateTheData] = useState('')

  const dispatch = useDispatch()

  console.log(isSaved)
  console.log( "data: ", data )

  useEffect(() => {
    getData()
  }, [isSaved])

  //SEND DATA TO FIREBASE
  const sendData = async() =>{
    try {
      const docRef = await addDoc(collection(db, "reactNativeLessons"), {
        title: "Zero to Hero",
        content: "React Native Tutorial for Beginners",
        lesson: 95 
      });
      console.log("Document written with ID: ", docRef.id),
      getData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //GET DATA FROM FIREBASE

  const getData= async() =>{

    const allData = []

    try {

      const querySnapshot = await getDocs(collection(db, "reactNativeLessons"));
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        allData.push({...doc.data(), id :doc.id})
      });
      setData(allData) 
    
    } catch (error) {
      console.log(error)
    }
  }

  //DELETE DATA FROM DATABASE
  const deleteData = async(value) => {
    try {
      await deleteDoc(doc(db, "reactNativeLessons", value));
      console.log("Delete Succesfull!")
      
    } catch (error) {
      console.log(error)
    }
    }


//UPDATE DATA FROM FIREBASE
  const updateData = async(value) => {
    try {

      const lessonData = doc(db, "reactNativeLessons", value);
      await updateDoc(lessonData, {
        content: updateTheData,
      });    
    } catch (error) {
      console.log(error)
    }
  }

  //LOGOUT
  const handleLogout = async()=>{
    dispatch(logout())
    console.log("Cikis!")
  }
  //

const renderItem = ({item, index}) => {
  
  return (
    <Animated.View
      entering={FlipInYRight.delay((index + 1) * 100)}
      style ={styles.flatListContainer}>
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
    </Animated.View>
  )
}

  return (
    <SafeAreaView style={styles.container}>


      {/* {data.map((value,index) => {
        return(
          <Pressable 
          onPress={()=> [updateData(value.id), setIsSaved(isSaved === false ? true : false)]} 
          key={index}>
          <Text>{index}</Text>
          <Text>{value?.id}</Text>
          <Text>{value.title}</Text>  
          <Text>{value.content}</Text>  
          <Text>{value.lesson}</Text>                          
          </Pressable>
          )
          })}
          */}
      <TextInput
        value ={updateTheData}
        onChangeText={setUpdateTheData}
        placeholder='Enter Your Data: '
        style={{borderWidth:1, width:'50%', paddingVertical:5, textAlign:'center', marginBottom:30}}
      />
      <Animated.FlatList
        entering={PinWheel}
        style= {styles.flatList}
        data={data}
        keyExtractor={ item => item.id}
        renderItem={renderItem}
      />


      <CustomButton
      buttonText={"Save"}
      setWidth={"40%"}
      buttonColor={'blue'}
      pressedButtonColor={'gray'}
      handleOnPress={sendData}
      />

      <CustomButton
      buttonText={"Get Data"}
      setWidth={"40%"}
      buttonColor={'blue'}
      pressedButtonColor={'gray'}
      handleOnPress={getData}
      />

      <CustomButton
      buttonText={"Delete Data"}
      setWidth={"40%"}
      buttonColor={'blue'}
      pressedButtonColor={'gray'}
      handleOnPress={deleteData}
      />

      <CustomButton
      buttonText={"Update Data"}
      setWidth={"40%"}
      buttonColor={'blue'}
      pressedButtonColor={'gray'}
      handleOnPress={updateData}
      />

      <CustomButton
      buttonText={"Logout"}
      setWidth={"40%"}
      buttonColor={'red'}
      pressedButtonColor={'gray'}
      handleOnPress={handleLogout}
      />

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
    borderWidth: 1, 
    marginVertical:5,
    alignItems:'center',
    justifyContent: 'center'
  },
  flatList: {
    width: '90%',
    padding: 10
  }
});