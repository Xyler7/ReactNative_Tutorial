import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Pressable, Alert, ScrollView
} from 'react-native';
import {
  updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, auth, sendEmailVerification
} from 'firebase/auth';

const AccountSettingsScreen = () => {
  const user = auth.currentUser;

  const [emailFields, setEmailFields] = useState({
    oldEmail: '',
    newEmail: '',
  });

  const [passwordFields, setPasswordFields] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const reauthenticate = async (oldPassword) => {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    return await reauthenticateWithCredential(user, credential);
  };

  const handleEmailUpdate = async () => {
    if (!user) return;
    const { oldEmail, newEmail } = emailFields;

    if (oldEmail.trim().toLowerCase() !== user.email) {
      return Alert.alert('Hata', 'Eski e-posta adresi yanlış.');
    }

    try {
      setLoading(true);

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        return Alert.alert('Uyarı', 'E-posta güncellemeden önce mevcut adresinizi doğrulamanız gerekiyor.');
      }

      await reauthenticate(passwordFields.oldPassword);
      await updateEmail(user, newEmail.trim());
      Alert.alert('Başarılı', 'E-posta adresiniz güncellendi.');
      setEmailFields({ oldEmail: '', newEmail: '' });
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Hata', 'Bu e-posta başka biri tarafından kullanılıyor.');
      } else if (error.code === 'auth/operation-not-allowed') {
        Alert.alert('Hata', 'E-posta değiştirme işlemi Firebase projenizde etkin değil.');
      } else {
        Alert.alert('Hata', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordFields;

    if (newPassword !== confirmPassword) {
      return Alert.alert('Hata', 'Yeni şifreler eşleşmiyor.');
    }

    try {
      setLoading(true);
      await reauthenticate(oldPassword);
      await updatePassword(user, newPassword);
      Alert.alert('Başarılı', 'Şifreniz güncellendi.');
      setPasswordFields({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.log(error);
      Alert.alert('Hata', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hesap Ayarları</Text>

      <Text style={styles.subheader}>E-posta Değiştir</Text>
      <TextInput
        placeholder="Eski e-posta"
        value={emailFields.oldEmail}
        onChangeText={(text) => setEmailFields({ ...emailFields, oldEmail: text })}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Yeni e-posta"
        value={emailFields.newEmail}
        onChangeText={(text) => setEmailFields({ ...emailFields, newEmail: text })}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Şifrenizi girin (doğrulama için)"
        value={passwordFields.oldPassword}
        onChangeText={(text) => setPasswordFields({ ...passwordFields, oldPassword: text })}
        secureTextEntry
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handleEmailUpdate} disabled={loading}>
        <Text style={styles.buttonText}>E-postayı Güncelle</Text>
      </Pressable>

      <Text style={styles.subheader}>Şifre Değiştir</Text>
      <TextInput
        placeholder="Eski Şifre"
        value={passwordFields.oldPassword}
        onChangeText={(text) => setPasswordFields({ ...passwordFields, oldPassword: text })}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Yeni Şifre"
        value={passwordFields.newPassword}
        onChangeText={(text) => setPasswordFields({ ...passwordFields, newPassword: text })}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Yeni Şifre (tekrar)"
        value={passwordFields.confirmPassword}
        onChangeText={(text) => setPasswordFields({ ...passwordFields, confirmPassword: text })}
        secureTextEntry
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handlePasswordUpdate} disabled={loading}>
        <Text style={styles.buttonText}>Şifreyi Güncelle</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
