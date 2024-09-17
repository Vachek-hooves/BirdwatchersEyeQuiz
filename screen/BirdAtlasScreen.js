import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ImagedLayout} from '../components/AppLayout';
import BirdAtlasCard from '../components/BirdAtlasComponents/BirdAtlasCard';
import {BirdContext} from '../store/bird_context';
import {useBirdContext} from '../store/bird_context';
import {COLOR} from '../constants/colors';
import ImagePicker from '../components/ui/interface/ImagePicker';

const DEFAULT_IMAGE = require('../assets/img/cardImg/NoImage.jpg');

const BirdAtlasScreen = () => {
  const {customBirds, addCustomBird} = useBirdContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newBird, setNewBird] = useState({
    image: '',
    name: '',
    scientificName: '',
    description: '',
    habitat: '',
    characteristics: '',
  });
  const handleAddBird = () => {
    setModalVisible(true);
  };

  const handleSaveBird = () => {
    const birdWithId = {
      ...newBird,
      id: Date.now().toString(),
      image: newBird.image || DEFAULT_IMAGE,
    };
    addCustomBird(birdWithId);
    setModalVisible(false);
    setNewBird({
      image: '',
      name: '',
      scientificName: '',
      description: '',
      habitat: '',
      characteristics: '',
    });
  };

  const handleImage = images => {
    if (images && images.length > 0) {
      setNewBird({...newBird, image: images[0]});
    }
  };
  return (
    <ImagedLayout blur={9}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddBird}>
        <Text style={styles.addButtonText}>Add Bird</Text>
      </TouchableOpacity>
      <BirdAtlasCard />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Bird</Text>
            <ImagePicker
              handleImage={handleImage}
              style={styles.imagePicker}
              btnStyle={styles.imagePickerBtn}>
              {newBird.image ? 'Change Image' : 'Select Image'}
            </ImagePicker>
            {newBird.image && (
              <Image
                source={{uri: newBird.image}}
                style={styles.previewImage}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newBird.name}
              onChangeText={text => setNewBird({...newBird, name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Scientific Name"
              value={newBird.scientificName}
              onChangeText={text =>
                setNewBird({...newBird, scientificName: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newBird.description}
              onChangeText={text => setNewBird({...newBird, description: text})}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Habitat"
              value={newBird.habitat}
              onChangeText={text => setNewBird({...newBird, habitat: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Characteristics"
              value={newBird.characteristics}
              onChangeText={text =>
                setNewBird({...newBird, characteristics: text})
              }
              multiline
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveBird}>
              <Text style={styles.saveButtonText}>Save Bird</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <View style={{height: 100}}></View>
          </ScrollView>
        </View>
      </Modal>
    </ImagedLayout>
  );
};

export default BirdAtlasScreen;

const styles = StyleSheet.create({
  addButton: {
    // backgroundColor: '#007AFF',
    backgroundColor: COLOR.gold,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: COLOR.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    // backgroundColor: COLOR.lightGreen,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLOR.gold,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    // backgroundColor: '#007AFF',
    backgroundColor: COLOR.gold,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    color: COLOR.black,
    textAlign: 'center',
  },
  cancelButton: {
    // backgroundColor: '#FF3B30',
    backgroundColor: COLOR.gold,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    width: '50%',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    color: COLOR.black,
    textAlign: 'center',
  },
  imagePicker: {
    color: COLOR.milk,
    fontSize: 16,
  },
  imagePickerBtn: {
    backgroundColor: COLOR.milk,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
});
