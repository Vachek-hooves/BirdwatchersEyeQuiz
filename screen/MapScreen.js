import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
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
    longitude: -99.8440,
    latitudeDelta: 15.032,
    longitudeDelta: 15.041,
  });

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
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    width: '90%',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 10,
    // backgroundColor: Colors.amethyst,
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.gold,
  },
  buttonText: {
    fontSize: 40,
    fontWeight: 'bold',
    // color: Colors.matteYellow,
  },
});
