import {StyleSheet, Text, View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconUser = ({focused}) => {
  return (
    <>
      <Image
        style={{width: 90, height: 70, borderRadius: 10}}
        source={require('../../../assets/icons/ornitolog.png')}
      />
      <View
        style={{
          marginTop: 3,
          backgroundColor: focused ? COLOR.lightGreen : null,
          height: 4,
          width: '60%',
          borderRadius: 30,
        }}></View>
    </>
  );
};

export default IconUser;

const styles = StyleSheet.create({});
