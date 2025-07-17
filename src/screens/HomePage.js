import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import { CustomButton } from '../components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';


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


  return (
    <View style={styles.container}>
      
    <TextInput
      value ={updateTheData}
      onChangeText={setUpdateTheData}
      placeholder='Enter Your Data: '
      style={{borderWidth:1, width:'50%', paddingVertical:5, textAlign:'center', marginBottom:30}}
    />

      {data.map((value,index) => {
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

    </View>
  );
}


export default HomePage

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fbfbfb'
  }
});