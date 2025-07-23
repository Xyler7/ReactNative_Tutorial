import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, StyleSheet, Switch, Pressable, Alert, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);




   useEffect(() => {
    const loadSettings = async () => {
      const sound = await AsyncStorage.getItem('soundEnabled');
      const notif = await AsyncStorage.getItem('notificationsEnabled');
      if (sound !== null) setSoundEnabled(JSON.parse(sound));
      if (notif !== null) setNotificationsEnabled(JSON.parse(notif));
    };
    loadSettings();
  }, []);

  const toggleSound = async () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    await AsyncStorage.setItem('soundEnabled', JSON.stringify(newVal));
  };

  const toggleNotifications = async () => {
    const newVal = !notificationsEnabled;
    setNotificationsEnabled(newVal);
    await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newVal));
  };

  const handleEmailChange = () => {
    // Navigation to email change screen (placeholder)
    Alert.alert("Bilgi", "E-posta değiştirme ekranına yönlendirileceksiniz.");
  };

  const handlePasswordChange = () => {
    // Navigation to password change screen (placeholder)
    Alert.alert("Bilgi", "Şifre değiştirme ekranına yönlendirileceksiniz.");
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>


      <Text style={styles.title}>Ayarlar</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Uygulama Sesi</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Bildirimler</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      <View style={styles.section}>
        <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AccountSettings', { mode: 'email' })}>
        <Text style={styles.buttonText}>E-posta Değiştir</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AccountSettings', { mode: 'password' })}>
        <Text style={styles.buttonText}>Şifre Değiştir</Text>
      </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ekstra Ayarlar</Text>
        <Pressable style={styles.button} onPress={() => Alert.alert('Yakında!', 'Dil seçimi özelliği yakında eklenecek.')}>
          <Text style={styles.buttonText}>Dil Seçimi</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => Alert.alert('Yakında!', 'Veri yedekleme yakında eklenecek.')}>
          <Text style={styles.buttonText}>Veri Yedekleme</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => Alert.alert('Yakında!', 'Gizlilik modu yakında eklenecek.')}>
          <Text style={styles.buttonText}>Gizlilik Modu</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SettingsScreen;
