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
          backgroundColor: focused ? COLOR.lightGreen : null,
          height: 4,
          width: '60%',
          borderRadius: 30,
        }}></View>
    </>
  );
};

export default IconAtlas;

const styles = StyleSheet.create({});
