import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Geçici ikonlar için

const buttons = [
  { label: 'Profile', screen: 'ProfileScreen', icon: 'user' },
  { label: 'Do List', screen: 'DoListScreen', icon: 'check-square' },
  { label: 'Team', screen: 'TeamScreen', icon: 'users' },
  { label: 'Agenda', screen: 'AgendaScreen', icon: 'calendar' },
  { label: 'Social', screen: 'SocialScreen', icon: 'globe' },
  { label: 'Settings', screen: 'SettingsScreen', icon: 'cog' },
];

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {buttons.map((item, index) => (
        <Pressable
          key={index}
          style={styles.box}
          onPress={() => navigation.navigate(item.screen)}
        >
          <FontAwesome name={item.icon} size={32} color="black" />
          <Text style={styles.label}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default HomePage;

  const styles = StyleSheet.create({
    container: {
    flex: 1, // sadece bu satır yeterli
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  box: {
    width: '40%',
    maxWidth: 160,
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
