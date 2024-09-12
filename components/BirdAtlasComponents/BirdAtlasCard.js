import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import {ATLAS} from '../../data/quiz_data';
import {COLOR} from '../../constants/colors';
import {useBirdContext} from '../../store/bird_context';

const {width, height} = Dimensions.get('window');

const BirdAtlasCard = () => {
  const [selectedBird, setSelectedBird] = useState(null);
  const {customBirds, deleteCustomBird} = useBirdContext();

  const allBirds = [...customBirds, ...ATLAS];

  const handleDeleteBird = bird => {
    Alert.alert(
      'Delete Bird',
      `Are you sure you want to delete ${bird.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteCustomBird(bird.id);
            if (selectedBird && selectedBird.id === bird.id) {
              setSelectedBird(null);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        {allBirds.map(bird => (
          <BirdCard
            key={bird.id}
            bird={bird}
            onPress={() => setSelectedBird(bird)}
            onDelete={
              customBirds.some(b => b.id === bird.id)
                ? () => handleDeleteBird(bird)
                : null
            }
          />
        ))}
      </ScrollView>

      {selectedBird && (
        <BirdModal
          bird={selectedBird}
          visible={!!selectedBird}
          onClose={() => setSelectedBird(null)}
          onDelete={
            customBirds.some(b => b.id === selectedBird.id)
              ? () => handleDeleteBird(selectedBird)
              : null
          }
        />
      )}
    </View>
  );
};

export default BirdAtlasCard;

const BirdCard = ({bird, onPress, onDelete}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <ImageBackground
      source={typeof bird.image === 'string' ? {uri: bird.image} : bird.image}
      style={styles.cardImage}
      resizeMode="cover">
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{bird.name}</Text>
        <Text style={styles.cardSubtitle}>{bird.scientificName}</Text>
      </View>
      {/* {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )} */}
    </ImageBackground>
  </TouchableOpacity>
);

const BirdModal = ({bird, visible, onClose, onDelete}) => (
  <Modal visible={visible} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <ScrollView
        style={styles.modalContent}
        showsVerticalScrollIndicator={false}>
        <Image
          source={
            typeof bird.image === 'string' ? {uri: bird.image} : bird.image
          }
          style={styles.modalImage}
        />
        <Text style={styles.modalTitle}>{bird.name}</Text>
        <Text style={styles.modalSubtitle}>{bird.scientificName}</Text>
        <Text style={styles.modalText}>
          <Text style={styles.bold}>Description:</Text> {bird.description}
        </Text>
        <Text style={styles.modalText}>
          <Text style={styles.bold}>Habitat:</Text> {bird.habitat}
        </Text>
        <Text style={styles.modalText}>
          <Text style={styles.bold}>Characteristics:</Text>{' '}
          {bird.characteristics}
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        {onDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
        <View style={{height: 50}}></View>
      </ScrollView>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 200, // Add some bottom padding
  },
  card: {
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: COLOR.milk,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: COLOR.lightGreen + 90,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: COLOR.milk + 90,
  },
  bold: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  cardInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
