import {
  Animated,
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
      duration: 3000,
      useNativeDriver: true,
    }).start(() => navigation.navigate('TabMenuRender'));
  }, [animation]);

  return (
    <ImagedLayout blur={0}>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, {opacity: animation}]}>
          Welcome to Birdwatchers Of Eye Quiz Hour
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, {opacity: animation}]}>
          Test your avian identification skills!
        </Animated.Text>
      </View>
    </ImagedLayout>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
});
