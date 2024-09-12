import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  Alert,
} from 'react-native';
import {ImagedLayout} from '../components/AppLayout';
import ImagePicker from '../components/ui/interface/ImagePicker';
import {COLOR} from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userProfile');
      if (userData !== null) {
        const {name, photo} = JSON.parse(userData);
        setName(name);
        setPhoto(photo);
        setIsRegistered(true);
      }
    } catch (error) {
      Alert.alert('Failed to load data', error.message);
    }
  };

  const saveUserData = async () => {
    if (name && photo) {
      const userProfile = {name, photo};
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
        Alert.alert('Success', 'User data saved successfully');
        setIsEditing(false);
        setIsRegistered(true);
      } catch (error) {
        Alert.alert('Failed to save data', error.message);
      }
    } else {
      Alert.alert('Please enter your name and select a photo');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <ImagedLayout blur={9}>
      <View style={styles.container}>
        {isRegistered && !isEditing ? (
          <>
            {photo && (
              <Image
                source={{uri: photo}}
                style={styles.imageSaved}
                resizeMode="contain"
              />
            )}
            <Text style={styles.nameSaved}>{name}</Text>
            <Button title="Edit Profile" onPress={handleEdit} />
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {isRegistered ? 'Edit Profile' : 'Log In'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={text => setName(text)}
              placeholderTextColor={COLOR.matteYellow + 90}
            />

            <ImagePicker
              handleImage={images => setPhoto(images[0])}
              btnStyle={styles.imagePickerBtn}>
              <Text style={styles.text}>Select Photo</Text>
            </ImagePicker>

            {photo && (
              <Image
                source={{uri: photo}}
                style={styles.image}
                resizeMode="contain"
              />
            )}

            <Button
              title={isRegistered ? 'SAVE CHANGES' : 'SAVE'}
              onPress={saveUserData}
            />
          </>
        )}
      </View>
    </ImagedLayout>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: COLOR.amethyst,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 20,
    color: COLOR.matteYellow,
    fontWeight: '600',
  },
  imagePickerBtn: {
    backgroundColor: COLOR.amethyst + 90,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 150,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  imageSaved: {
    width: 260,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  nameSaved: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLOR.amethyst,
    marginVertical: 25,
  },
  text: {color: COLOR.matteYellow, fontWeight: '700', fontSize: 18},
});
