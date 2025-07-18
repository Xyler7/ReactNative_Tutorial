import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage, ProfilePage } from '../screens';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (

    <Stack.Navigator
        screenOptions={{ headerShown: false }}>

      <Stack.Screen name='Home' component={HomePage} />
      <Stack.Screen name='Profile' component={ProfilePage} />

    </Stack.Navigator>
  );
};

export default UserStack;
