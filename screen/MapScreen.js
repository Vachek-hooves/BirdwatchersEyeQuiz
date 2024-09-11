import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {ImageOnBg} from '../components/layout';
import MapView, {Marker} from 'react-native-maps';
import {useState} from 'react';
import {COLOR} from '../constants/colors';
import {ImagedLayout} from '../components/AppLayout';

const {height} = Dimensions.get('screen');
const MAP_HEIGHT = height * 0.6;

const MapScreen = ({latitude, longitude}) => {
  const [region, setRegion] = useState({
    latitude: 37.9664,
    longitude: -99.844,
    latitudeDelta: 15.032,
    longitudeDelta: 15.041,
  });
  const [inputLatitude, setInputLatitude] = useState('');
  const [inputLongitude, setInputLongitude] = useState('');

  const handleSearch = () => {
    const lat = parseFloat(inputLatitude);
    const lon = parseFloat(inputLongitude);
    if (!isNaN(lat) && !isNaN(lon)) {
      setRegion({
        ...region,
        latitude: lat,
        longitude: lon,
      });
    }
  };

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 1.1,
      longitudeDelta: region.longitudeDelta / 1.1,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 1.1,
      longitudeDelta: region.longitudeDelta * 1.1,
    });
  };

  return (
    <ImagedLayout blur={10}>
      <MapView
        style={styles.rootContainer}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={zoomIn}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={zoomOut}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={inputLatitude}
            onChangeText={setInputLatitude}
            keyboardType="numeric"
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={inputLongitude}
            onChangeText={setInputLongitude}
            keyboardType="numeric"
            placeholderTextColor="white"
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </ImagedLayout>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  rootContainer: {
    height: 1,
    height: MAP_HEIGHT,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 150,
    left: 10,
    flexDirection: 'column',
    gap: 20,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'stretch',
    width: '100%',
    alignItems: 'flex-start',
  },
  button: {
    marginHorizontal: 10,
    // backgroundColor: Colors.amethyst,
    borderRadius: 25,
    padding: 10,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.lightGreen,
  },
  buttonText: {
    fontSize: 40,
    fontWeight: 'bold',
    // color: Colors.matteYellow,
  },
  inputContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 50,
    gap: 20,
    marginTop: 30,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  searchButton: {
    backgroundColor: COLOR.lightGreen,
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
