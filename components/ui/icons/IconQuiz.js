import {StyleSheet, Text, View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconQuiz = ({focused}) => {
  return (
    <>
      <Image
        style={{width: 70, height: 70, borderRadius: 10}}
        source={require('../../../assets/icons/birdSmart.png')}
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

export default IconQuiz;

const styles = StyleSheet.create({});
