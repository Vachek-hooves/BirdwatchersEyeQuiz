import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImagedLayout} from '../components/AppLayout';
import BirdAtlasCard from '../components/BirdAtlasComponents/BirdAtlasCard';

const BirdAtlasScreen = () => {
  return (
    <ImagedLayout blur={9}>
      <BirdAtlasCard />
    </ImagedLayout>
  );
};

export default BirdAtlasScreen;

const styles = StyleSheet.create({});
