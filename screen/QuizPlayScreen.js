import {StyleSheet, Text, View} from 'react-native';
import {useBirdContext} from '../store/bird_context';
import {ImagedLayout} from '../components/AppLayout';

const QuizPlayScreen = ({navigation, route}) => {
  const {chooseQuizMode} = useBirdContext();
  const {difficulty} = route.params;
  const quizData = chooseQuizMode(difficulty);
  console.log(quizData);

  return <ImagedLayout></ImagedLayout>;
};

export default QuizPlayScreen;

const styles = StyleSheet.create({});
