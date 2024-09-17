import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {ImagedLayout} from '../components/AppLayout';
import {useBirdContext} from '../store/bird_context';
import {COLOR} from '../constants/colors';

const WELCOME_TEXT = [
  'We’re excited to welcome you to the app that will become your trusted companion in the world of birds. Here, you’ll discover a variety of engaging features for birdwatching and learning. Explore fascinating articles about birds, their habits, habitats, and behavior. Keep your own bird watching journal to record every memorable encounter with nature',
  'If you spot a bird you don’t recognize, use the description search feature for quick identification. To deepen your knowledge, take part in quizzes that will help you learn more about different bird species and their unique characteristics.',
  'Immerse yourself in the world of birds, explore, learn, and enjoy every moment with Birdwatcher’s Eye Quiz!',
];

const QuizScreen = ({navigation}) => {
  return (
    <ImagedLayout blur={9}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Birdwatcher's Eye Quiz!</Text>
          {WELCOME_TEXT.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QuizModeScreen')}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 100}}></View>
      </ScrollView>
    </ImagedLayout>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLOR.lightGreen + 90,
    backgroundColor:'rgba(0, 0, 0, 0.4)',
    borderRadius:16

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    color:COLOR.gold
  },
  paragraph: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: COLOR.gold,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: COLOR.black,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
