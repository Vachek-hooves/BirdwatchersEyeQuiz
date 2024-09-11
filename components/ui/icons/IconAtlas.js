import {StyleSheet, Text, View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconAtlas = ({focused}) => {
  return (
    <>
      <View
        styles={{
          backgroundColor: focused ? COLOR.gold : null,
          height: 10,
          width: 10,
          borderRadius: 10,
        }}></View>
      <Image
        style={{width: 70, height: 70}}
        source={require('../../../assets/icons/vividly.png')}
      />
    </>
  );
};

export default IconAtlas;

const styles = StyleSheet.create({});
