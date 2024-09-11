import {StyleSheet, Text, View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconQuiz = ({focused}) => {
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
        style={{width: 70, height: 70, borderRadius: 10}}
        source={require('../../../assets/icons/birdSmart.png')}
      />
    </>
  );
};

export default IconQuiz;

const styles = StyleSheet.create({});
