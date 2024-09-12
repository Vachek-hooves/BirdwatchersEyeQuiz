import {StyleSheet, Text, View} from 'react-native';


const QuizPlayScreen = ({navigation}) => {
  const handleDifficultySelect = difficulty => {
    navigation.navigate('QuizPlayScreen', {difficulty});
  };
  
  return (
    <View>
      <Text>QuizPlayScreen</Text>
    </View>
  );
};

export default QuizPlayScreen;

const styles = StyleSheet.create({});
