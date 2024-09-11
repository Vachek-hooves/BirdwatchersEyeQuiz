import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRef, useEffect} from 'react';
import {ImagedLayout} from '../components/AppLayout';

const IntroScreen = ({navigation}) => {
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => navigation.navigate('TabMenuRender'));
  }, [animation]);

  return <ImagedLayout blur={0}></ImagedLayout>;
};

export default IntroScreen;

const styles = StyleSheet.create({});
