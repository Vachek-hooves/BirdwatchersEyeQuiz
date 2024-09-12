import {StyleSheet, Text, View} from 'react-native';
import {ImagedLayout} from '../components/AppLayout';

const QuizQuestion = ({route}) => {
  const {quizId, difficulty} = route.params;

  return <ImagedLayout blur={300}></ImagedLayout>;
};

export default QuizQuestion;

const styles = StyleSheet.create({});
