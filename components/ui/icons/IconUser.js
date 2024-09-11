import {View, Image, StyleSheet} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconUser = ({focused}) => {
  return (
    <>
      <Image
        style={{
          width: 80,
          height: 60,
          borderRadius: 10,
          transform: focused ? [{scale: 1.5}] : [{scale: 1}],
        }}
        source={require('../../../assets/icons/ornitolog.png')}
      />
      <View
        style={{
          marginTop: focused ? 8 : 0,
          backgroundColor: focused ? COLOR.lightGreen : null,
          // height: 4,
          // width: '80%',
          // borderRadius: 30,
        }}></View>
    </>
  );
};

export default IconUser;

const styles = StyleSheet.create({
  imageFocused: {
    transform: [{scale: 1.2}],
  },
});
