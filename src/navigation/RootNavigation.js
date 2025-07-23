import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, fetchUserProfile } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';

const RootNavigation = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, async (user) => {
  clearTimeout(timeoutId);

  if (user) {
    dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
    dispatch(fetchUserProfile(user.uid)); // <-- Profil bilgilerini getir
  } else {
    await AsyncStorage.removeItem('userToken');
    dispatch(setUser(null));
  }

  setLoading(false);
});

  useEffect(() => {
    let timeoutId;
    let handled = false; // bir defadan fazla işlem yapılmasın

    const timeoutHandler = async () => {
      if (handled) return;
      handled = true;

      console.log('🔥 Firebase yanıtı gecikti. Oturum sıfırlanıyor...');
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log('❗ AsyncStorage temizlenirken hata:', e);
      }
      dispatch(setUser(null));
      setLoading(false);
    };

    timeoutId = setTimeout(timeoutHandler, 10000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (handled) return;
      handled = true;

      clearTimeout(timeoutId);

      try {
        if (user) {
          dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
        } else {
          await AsyncStorage.removeItem('userToken');
          dispatch(setUser(null));
        }
      } catch (e) {
        console.log('❗ Auth işlemi sırasında hata:', e);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuth ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
