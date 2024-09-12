import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ImagedLayout} from '../components/AppLayout';
import {useBirdContext} from '../store/bird_context';

const QuizQuestion = ({route}) => {
  const {quizId, difficulty} = route.params;
  const {chooseQuizMode} = useBirdContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const quizLevelData = chooseQuizMode(difficulty);
    const selectedQuiz = quizLevelData.find(quiz => quiz.id === quizId);
    setQuizData(selectedQuiz);
  }, [quizId, difficulty, chooseQuizMode]);

  if (!quizData) {
    return (
      <ImagedLayout blur={300}>
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </ImagedLayout>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleAnswer = selectedAnswer => {
    if (isAnswered) return;

    setSelectedAnswer(selectedAnswer);
    setIsAnswered(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Quiz finished, handle end of quiz (e.g., show results, navigate to summary screen)
        console.log(
          'Quiz finished. Final score:',
          score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0),
        );
      }
    }, 2000); // 1.5 second delay
  };

  const getButtonStyle = option => {
    if (!isAnswered) return styles.answerButton;
    if (option === currentQuestion.correctAnswer)
      return [styles.answerButton, styles.correctAnswer];
    if (option === selectedAnswer)
      return [styles.answerButton, styles.wrongAnswer];
    return [styles.answerButton, styles.disabledAnswer];
  };

  return (
    <ImagedLayout blur={300}>
      <View style={styles.container}>
        <Text style={styles.scoreText}>
          Score: {score}/{currentQuestionIndex + 1}
        </Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getButtonStyle(option)}
            onPress={() => handleAnswer(option)}
            disabled={isAnswered}>
            <Text style={styles.answerText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImagedLayout>
  );
};

export default QuizQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  correctAnswer: {
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    shadowColor: 'rgba(0, 255, 0, 0.5)',
    shadowOffset: {width: 3, height: 9},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  wrongAnswer: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    shadowColor: 'rgba(255, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  disabledAnswer: {
    opacity: 0.5,
  },
  answerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
});
