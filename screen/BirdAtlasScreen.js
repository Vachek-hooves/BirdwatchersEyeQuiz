import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {ImagedLayout} from '../components/AppLayout';
import BirdAtlasCard from '../components/BirdAtlasComponents/BirdAtlasCard';
import {BirdContext} from '../store/bird_context';
import {useBirdContext} from '../store/bird_context';

const BirdAtlasScreen = () => {
  const {customBirds, addCustomBird} = useBirdContext();
  console.log(customBirds);
  const handleAddBird = () => {
    const newBird = {
      image: '',
      id: Date.now().toString(),
      name: '',
      scientificName: '',
      description: '',
      habitat: '',
      characteristics: '',
    };
    addCustomBird(newBird);
  };
  return (
    <ImagedLayout blur={9}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddBird}>
        <Text style={styles.addButtonText}>Add Bird</Text>
      </TouchableOpacity>
      <BirdAtlasCard />
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
});
