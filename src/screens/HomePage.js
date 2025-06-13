import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomePage = () => {
  console.log("HomePage Rendered");

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomePage</Text>
    </View>
  );
};


export default HomePage

const styles = StyleSheet.create({})