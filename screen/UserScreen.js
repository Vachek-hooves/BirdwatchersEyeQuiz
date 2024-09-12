import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ImagedLayout} from '../components/AppLayout';
import ImagePicker from '../components/ui/interface/ImagePicker';
import {COLOR} from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IconAccaunt, IconCamera} from '../components/ui/icons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nameError, setNameError] = useState('');

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

  const saveUserData = useCallback(async () => {
    if (name.trim().length < 3) {
      setNameError('Name must be at least 3 characters long');
      return;
    }
    if (!photo) {
      Alert.alert('Photo Required', 'Please select a profile photo');
      return;
    }

    const userProfile = {name: name.trim(), photo};
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
      setIsRegistered(true);
      setNameError('');
    } catch (error) {
      Alert.alert('Update Failed', 'Unable to save profile. Please try again.');
    }
  }, [name, photo]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const renderProfileView = () => (
    <>
      {photo && (
        <Image
          source={{uri: photo}}
          style={styles.imageSaved}
          resizeMode="cover"
        />
      )}
      <Text style={styles.nameSaved}>{name}</Text>
      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        {/* <Icon name="account-edit" size={24} color={COLOR.matteYellow} /> */}
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </>
  );

  const renderEditView = () => (
    <>
      <Text style={styles.title}>
        {isRegistered ? 'Edit Profile' : 'Create Profile'}
      </Text>

      <View style={styles.inputContainer}>
        <IconAccaunt />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={text => {
            setName(text);
            setNameError('');
          }}
          placeholderTextColor={COLOR.matteYellow + '90'}
        />
      </View>
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <ImagePicker
        handleImage={images => setPhoto(images[0])}
        btnStyle={styles.imagePickerBtn}>
        <IconCamera />
      </ImagePicker>

      {photo && (
        <Image source={{uri: photo}} style={styles.image} resizeMode="cover" />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={saveUserData}>
        <Text style={styles.saveButtonText}>
          {isRegistered ? 'SAVE CHANGES' : 'CREATE PROFILE'}
        </Text>
      </TouchableOpacity>
    </>
  );

  return (
    <ImagedLayout blur={9}>
      <View style={styles.container}>
        {isRegistered && !isEditing ? renderProfileView() : renderEditView()}
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
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    color: COLOR.milk,
    letterSpacing: 2,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    color: COLOR.matteYellow,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  imagePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.milk + '90',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    width: 100,
    alignSelf: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
  imageSaved: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.lightGreen,
    padding: 10,
    borderRadius: 10,
  },
  editButtonText: {
    color: COLOR.milk,
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: COLOR.lightGreen,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLOR.milk,
    fontWeight: '700',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLOR.milk,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  text: {fontWeight: '600', fontSize: 20},
  nameSaved: {
    marginVertical: 10,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '800',
    color: COLOR.milk,
    letterSpacing: 3,
  },
});
