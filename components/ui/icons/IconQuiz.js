import {View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconQuiz = ({focused}) => {
  return (
    <>
      <Image
        style={{
          width: 70,
          height: 70,

          transform: focused ? [{scale: 1.3}] : [{scale: 1}],
        }}
        source={require('../../../assets/icons/birdSmart.png')}
      />
      <View
        style={{
          marginTop: focused ? 8 : 0,
          backgroundColor: focused ? COLOR.lightGreen : null,
        }}></View>
    </>
  );
};

export default IconQuiz;
