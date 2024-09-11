import {StyleSheet, Text, View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconUser = ({focused}) => {
  return (
    <>
      <View
        styles={{
          backgroundColor: focused ? 'black' : null,
          height: 10,
          width: 10,
          borderRadius: 10,
        }}></View>
      <Image
        style={{width: 90, height: 70, borderRadius: 10}}
        source={require('../../../assets/icons/ornitolog.png')}
      />
    </>
  );
};

export default IconUser;

const styles = StyleSheet.create({});
