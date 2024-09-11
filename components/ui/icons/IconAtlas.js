import {StyleSheet, Text, View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconAtlas = ({focused}) => {
  return (
    <>
      <Image
        style={{width: 70, height: 70}}
        source={require('../../../assets/icons/falcon.png')}
      />
      <View
        style={{
          backgroundColor: focused ? '#fff' : null,
          borderRadius: 40,
        }}></View>
      <View
        styles={{
          backgroundColor: focused ? '#fff' : '#fff',
          height: 20,
          width: 20,
          borderRadius: 10,
        }}></View>
    </>
  );
};

export default IconAtlas;

const styles = StyleSheet.create({});
