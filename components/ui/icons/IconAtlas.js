import {View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconAtlas = ({focused}) => {
  return (
    <>
      <Image
        style={{
          width: 60,
          height: 60,
          transform: focused ? [{scale: 1.3}] : [{scale: 1}],
        }}
        source={require('../../../assets/icons/falcon.png')}
      />

      <View
        style={{
          marginTop: focused ? 8 : 0,
          backgroundColor: focused ? COLOR.lightGreen : null,
          // height: 4,
          // width: '60%',
          // borderRadius: 30,
        }}></View>
    </>
  );
};

export default IconAtlas;
