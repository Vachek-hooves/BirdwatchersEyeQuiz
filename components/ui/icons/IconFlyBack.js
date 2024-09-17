import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../../../constants/colors';

const IconFlyBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{alignItems: 'flex-end'}}>
      <Image
        source={require('../../../assets/icons/return.png')}
        style={{
          width: 60,
          height: 60,
          marginVertical: 30,
          marginRight: 80,
          tintColor: COLOR.gold,
        }}
      />
    </TouchableOpacity>
  );
};

export default IconFlyBack;

const styles = StyleSheet.create({});
