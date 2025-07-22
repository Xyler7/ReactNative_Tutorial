import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const userId = user?.uid;

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    username: user?.displayName || '',
    social: '',
    photoURL: user?.photoURL || '',
  });

  // Firestore'dan mevcut verileri çek
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      const docRef = doc(db, 'profiles', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile({ ...profile, ...docSnap.data() });
      }
    };

    fetchProfile();
  }, [userId]);

  // Firestore'a verileri kaydet
  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'profiles', userId), profile);
      setEditMode(false);
    } catch (error) {
      console.log('Profil kaydedilirken hata:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil</Text>

      {profile.photoURL ? (
        <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}><Text>📷</Text></View>
      )}

      {editMode ? (
        <>
          <TextInput
            placeholder="Ad Soyad"
            style={styles.input}
            value={profile.fullName}
            onChangeText={(text) => setProfile({ ...profile, fullName: text })}
          />
          <TextInput
            placeholder="Telefon"
            style={styles.input}
            value={profile.phone}
            onChangeText={(text) => setProfile({ ...profile, phone: text })}
          />
          <TextInput
            placeholder="Sosyal Medya"
            style={styles.input}
            value={profile.social}
            onChangeText={(text) => setProfile({ ...profile, social: text })}
          />
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Kaydet</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.label}>Ad Soyad: {profile.fullName}</Text>
          <Text style={styles.label}>E-posta: {profile.email}</Text>
          <Text style={styles.label}>Kullanıcı Adı: {profile.username}</Text>
          <Text style={styles.label}>Telefon: {profile.phone}</Text>
          <Text style={styles.label}>Sosyal Medya: {profile.social}</Text>

          <Pressable style={styles.button} onPress={() => setEditMode(true)}>
            <Text style={styles.buttonText}>Profili Düzenle</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
