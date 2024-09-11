import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const ImagedLayout = ({children, source, style}) => {
  return (
    <ImageBackground
      style={[style, {flex: 1}]}
      source={require('../../assets/img/bg/eagleDraw.jpg')}>
      <SafeAreaView>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default ImagedLayout;

const styles = StyleSheet.create({});
