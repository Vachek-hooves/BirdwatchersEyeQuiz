import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useBirdContext} from '../store/bird_context';
import {ImagedLayout} from '../components/AppLayout';
import {IconFlyBack} from '../components/ui/icons';
import { COLOR } from '../constants/colors';

// New component to display difficulty
const DifficultyBadge = ({ difficulty }) => (
  <View style={styles.difficultyBadge}>
    <Text style={styles.difficultyText}>{difficulty}</Text>
  </View>
);

const QuizPlayScreen = ({navigation, route}) => {
  const {chooseQuizMode} = useBirdContext();
  const {difficulty} = route.params;
  const quizData = chooseQuizMode(difficulty);

  const handleQuizSelect = quizId => {
    // Navigate to the actual quiz screen with the selected quiz ID
    navigation.navigate('QuizQuestion', {quizId, difficulty});
  };

  return (
    <ImagedLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {quizData.map(quiz => (
          <TouchableOpacity
            disabled={!quiz.active}
            key={quiz.id}
            style={styles.cardContainer}
            onPress={() => handleQuizSelect(quiz.id)}>
            <ImageBackground
              blurRadius={!quiz.active ? 20 : 0}
              source={{uri: quiz.image}}
              style={styles.cardBackground}
              imageStyle={styles.cardImage}>
              <DifficultyBadge difficulty={difficulty} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Quiz Level {quiz.id}</Text>
                <Text style={styles.cardStatus}>
                  {quiz.active ? 'Active' : 'Locked'}
                </Text>
                <Text style={styles.cardScore}>Score: {quiz.score}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <IconFlyBack />
    </ImagedLayout>
  );
};

export default QuizPlayScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardBackground: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: 8,
  },
  cardContent: {
    width: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#fff',
    marginBottom: 8,
    color:COLOR.gold
  },
  cardStatus: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  cardScore: {
    fontSize: 16,
    color: '#fff',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  difficultyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
