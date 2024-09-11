import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ImagedLayout = ({children, style}) => {
  return (
    <ImageBackground style={[style, {flex: 1}]}>{children}</ImageBackground>
  );
};

export default ImagedLayout;

const styles = StyleSheet.create({});
