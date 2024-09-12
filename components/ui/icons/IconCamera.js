import {View, Image} from 'react-native';
import {COLOR} from '../../../constants/colors';

const IconCamera = () => {
  return (
    <Image
      style={{
        width: 70,
        height: 70,
      }}
      source={require('../../../assets/icons/camera.png')}
    />
  );
};

export default IconCamera;
