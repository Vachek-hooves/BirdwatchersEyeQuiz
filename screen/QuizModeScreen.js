import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useBirdContext} from '../store/bird_context';
import {ImagedLayout} from '../components/AppLayout';
import {COLOR} from '../constants/colors';

const QuizModeScreen = ({navigation}) => {
  const handleDifficultySelect = difficulty => {
    navigation.navigate('QuizPlayScreen', {difficulty});
  };

  return (
    <ImagedLayout blur={10}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Difficulty</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, styles.easyCard]}
            onPress={() => handleDifficultySelect('easy')}>
            <Text style={styles.cardText}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.hardCard]}
            onPress={() => handleDifficultySelect('hard')}>
            <Text style={styles.cardText}>Hard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImagedLayout>
  );
};

export default QuizModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 40,
    color: COLOR.milk,
    textAlign: 'center',
    color: COLOR.lightGreen,
    letterSpacing: 2,
  },
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  easyCard: {
    backgroundColor: COLOR.green,
  },
  hardCard: {
    backgroundColor: COLOR.red,
  },
  cardText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: COLOR.milk,
  },
});
