import {View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconMap = ({focused}) => {
  return (
    <>
      <Image
        style={{
          width: 80,
          height: 80,
          transform: focused ? [{scale: 1.5}] : [{scale: 1}],
        }}
        source={require('../../../assets/icons/map.png')}
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

export default IconMap;
