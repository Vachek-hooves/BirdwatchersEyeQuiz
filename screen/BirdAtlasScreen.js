import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ImagedLayout} from '../components/AppLayout';
import BirdAtlasCard from '../components/BirdAtlasComponents/BirdAtlasCard';
import {BirdContext} from '../store/bird_context';
import {useBirdContext} from '../store/bird_context';
import {COLOR} from '../constants/colors';

const BirdAtlasScreen = () => {
  const {customBirds, addCustomBird} = useBirdContext();
  console.log(customBirds);
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
    const birdWithId = {...newBird, id: Date.now().toString()};
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
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={newBird.image}
              onChangeText={text => setNewBird({...newBird, image: text})}
            />
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
          </ScrollView>
        </View>
      </Modal>
    </ImagedLayout>
  );
};

export default BirdAtlasScreen;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
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
    backgroundColor: COLOR.lightGreen,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
