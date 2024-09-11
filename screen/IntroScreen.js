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

const IntroScreen = ({navigation}) => {
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => navigation.navigate('TabMenuRender'));
  }, [animation]);
  return (
    <View>
      <Text>IntroScreen</Text>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({});
