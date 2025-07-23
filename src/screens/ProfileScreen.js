import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  Pressable, Image, ScrollView, Alert
} from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { db, storage } from '../../firebaseConfig';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user?.uid;

  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [localProfile, setLocalProfile] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    username: user?.displayName || '',
    social: '',
    photoURL: '',
  });

  // Profili getir
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLocalProfile((prev) => ({
          ...prev,
          ...docSnap.data(),
        }));
      }
    };

    fetchProfile();
  }, [userId]);

  // Firebase'e profil kaydet
  const handleSave = async () => {
    try {
      if (!userId) return;

      await setDoc(doc(db, 'users', userId), {
        ...localProfile,
        email: user.email,
        username: user.displayName,
      });

      setEditMode(false);
      Alert.alert('Başarılı', 'Profil kaydedildi.');
    } catch (error) {
      console.log('❌ Profil kaydedilemedi:', error);
      Alert.alert('Hata', 'Profil kaydedilirken bir hata oluştu.');
    }
  };

  // Fotoğraf Seçici
  const handlePhotoSelect = () => {
    Alert.alert(
      "Pick a Photo",
      "Chose a photo from your camera or gallery.",
      [
        { text: "Camera", onPress: openCamera },
        { text: "From Galery", onPress: openGallery },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && result.assets?.length > 0) {
      uploadImage(result.assets[0]);
    }
  };

  const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    if (!result.didCancel && result.assets?.length > 0) {
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (asset) => {
    try {
      setUploading(true);
      const response = await fetch(asset.uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `profilePictures/${userId}/${uuidv4()}.jpg`);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      setLocalProfile((prev) => ({ ...prev, photoURL: downloadURL }));
      setUploading(false);
    } catch (error) {
      console.log("Fotoğraf yüklenemedi:", error);
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profil</Text>

      <Pressable onPress={handlePhotoSelect}>
        {localProfile.photoURL ? (
          <Image source={{ uri: localProfile.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}><Text>📷</Text></View>
        )}
      </Pressable>

      {editMode ? (
        <>
          <TextInput
            placeholder="Ad Soyad"
            style={styles.input}
            value={localProfile.fullName}
            onChangeText={(text) => setLocalProfile({ ...localProfile, fullName: text })}
          />
          <TextInput
            placeholder="Telefon"
            style={styles.input}
            value={localProfile.phone}
            onChangeText={(text) => setLocalProfile({ ...localProfile, phone: text })}
          />
          <TextInput
            placeholder="Sosyal Medya"
            style={styles.input}
            value={localProfile.social}
            onChangeText={(text) => setLocalProfile({ ...localProfile, social: text })}
          />
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>{uploading ? 'Kaydediliyor...' : 'Kaydet'}</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.label}>Ad Soyad: {localProfile.fullName}</Text>
          <Text style={styles.label}>E-posta: {localProfile.email}</Text>
          <Text style={styles.label}>Kullanıcı Adı: {localProfile.username}</Text>
          <Text style={styles.label}>Telefon: {localProfile.phone}</Text>
          <Text style={styles.label}>Sosyal Medya: {localProfile.social}</Text>

          <Pressable style={styles.button} onPress={() => setEditMode(true)}>
            <Text style={styles.buttonText}>Profili Düzenle</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
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
