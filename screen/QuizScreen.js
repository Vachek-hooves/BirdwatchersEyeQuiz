import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImagedLayout} from '../components/AppLayout';
import {useBirdContext} from '../store/bird_context';

const WELCOME_TEXT = [
  'We’re excited to welcome you to the app that will become your trusted companion in the world of birds. Here, you’ll discover a variety of engaging features for birdwatching and learning. Explore fascinating articles about birds, their habits, habitats, and behavior. Keep your own bird watching journal to record every memorable encounter with nature',
  'If you spot a bird you don’t recognize, use the description search feature for quick identification. To deepen your knowledge, take part in quizzes that will help you learn more about different bird species and their unique characteristics.',
  'Immerse yourself in the world of birds, explore, learn, and enjoy every moment with Birdwatcher’s Eye Quiz!',
];

const QuizScreen = ({navigation}) => {
  
  return <ImagedLayout blur={9}></ImagedLayout>;
};

export default QuizScreen;

const styles = StyleSheet.create({});
