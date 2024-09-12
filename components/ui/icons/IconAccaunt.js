import {View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconAccaunt = () => {
  return (
    <Image
      style={{
        width: 30,
        height: 30,
        tintColor: COLOR.lightGreen,
      }}
      source={require('../../../assets/icons/user.png')}
    />
  );
};

export default IconAccaunt;
