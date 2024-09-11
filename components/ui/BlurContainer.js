import {StyleSheet, Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const BlurContainer = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor="white"
      />
      <View>{children}</View>
    </View>
  );
};

export default BlurContainer;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
