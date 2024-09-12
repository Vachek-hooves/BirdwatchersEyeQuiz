import {StyleSheet, Text, View} from 'react-native';
import {useBirdContext} from '../store/bird_context';

const QuizPlayScreen = ({navigation, route}) => {
  const {chooseQuizMode} = useBirdContext();
  const {difficulty} = route.params;
  const quizData = chooseQuizMode(difficulty);
  console.log(quizData);

  return (
    <View>
      <Text>QuizPlayScreen</Text>
    </View>
  );
};

export default QuizPlayScreen;

const styles = StyleSheet.create({});
