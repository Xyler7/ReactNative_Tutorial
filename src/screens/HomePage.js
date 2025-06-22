import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import { CustomButton } from '../components';
import { useState } from 'react';

const HomePage = () => {

  const [data, setData] = useState([])

  console.log( "data: ", data )

  //SEND DATA TO FIREBASE
  const sendData = async() =>{
    try {
  const docRef = await addDoc(collection(db, "reactNativeLessons"), {
    title: "Zero to Hero",
    content: "React Native Tutorial for Beginners",
    lesson: 95 
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
  }

  //GET DATA FROM FIREBASE

  const getData= async() =>{

    const querySnapshot = await getDocs(collection(db, "reactNativeLessons"));
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      setData([...data, doc.data() ])
    });
  }

  //DELETE DATA FROM DATABASE
  const deleteData = async() => {
    await deleteDoc(doc(db, "reactNativeLessons", "DcUEVh18XGndqkZj1HRv"));
  }


//UPDATE DATA FROM FIREBASE
  const updateData = async() => {
    try {
      const lessonData = doc(db, "reactNativeLessons", "PELkAyOETKK1wT5LijyX");
      await updateDoc(lessonData, {
        lesson: 35
});    
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{data[0]?.title}</Text>
      <Text>{data[0]?.content}</Text>
      <Text>{data[0]?.lesson}</Text>
      <Text>{data[1]?.title}</Text>
      <Text>{data[1]?.content}</Text>
      <Text>{data[1]?.lesson}</Text>
      
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

    </View>
  );
};


export default HomePage

const styles = StyleSheet.create({})