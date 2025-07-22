import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage, ProfileScreen, DoListScreen, TeamScreen,
          AgendaScreen, SocialScreen, SettingsScreen } from '../screens';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (

     <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Ana Sayfa' }} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DoListScreen" component={DoListScreen} />
      <Stack.Screen name="TeamScreen" component={TeamScreen} />
      <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
      <Stack.Screen name="SocialScreen" component={SocialScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
