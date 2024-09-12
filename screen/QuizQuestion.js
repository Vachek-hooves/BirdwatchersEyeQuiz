import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {ImagedLayout} from '../components/AppLayout';
import {useBirdContext} from '../store/bird_context';

const QuizQuestion = ({route, navigation}) => {
  const {quizId, difficulty} = route.params;
  const {chooseQuizMode, updateQuizScore} = useBirdContext();
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

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Quiz finished, handle end of quiz
        showQuizResults(isCorrect);
      }
    }, 2000); // 2 second delay
  };

  const showQuizResults = (isLastAnswerCorrect) => {
    const totalQuestions = quizData.questions.length;
    const finalScore = isLastAnswerCorrect ? score + 1 : score;
    const correctAnswers = quizData.questions.map(q => `${q.question}\nCorrect Answer: ${q.correctAnswer}`).join('\n\n');

    // Update the quiz score in the context
    updateQuizScore(difficulty, quizId, finalScore);

    Alert.alert(
      "Quiz Finished",
      `Your Score: ${finalScore}/${totalQuestions}\n\nCorrect Answers:\n${correctAnswers}`,
      [
        { text: "OK", onPress: () => navigation.goBack() }
      ],
      { cancelable: false }
    );
  };

  const getButtonStyle = option => {
    if (!isAnswered) return styles.answerButton;
    if (option === currentQuestion.correctAnswer)
      return [styles.answerButton, styles.correctAnswer];
    if (option === selectedAnswer)
      return [styles.answerButton, styles.wrongAnswer];
    return [styles.answerButton, styles.disabledAnswer];
  };

  const getTextStyle = option => {
    if (!isAnswered) return styles.answerText;
    if (option === currentQuestion.correctAnswer)
      return [styles.answerText, styles.correctAnswer];
    if (option === selectedAnswer)
      return [styles.answerText, styles.wrongAnswer];
    return [styles.answerText, styles.disabledAnswer];
  };

  return (
    <ImagedLayout blur={300}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.scoreContainer}>
          <View style={styles.scoreWrapper}>
            <Text style={styles.scoreLabel}>Score:</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
          <View style={styles.progressWrapper}>
            <Text style={styles.progressLabel}>Question:</Text>
            <Text style={styles.progressValue}>{currentQuestionIndex + 1}</Text>
            <Text style={styles.progressTotal}>
              / {quizData.questions.length}
            </Text>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getButtonStyle(option)}
              onPress={() => handleAnswer(option)}
              disabled={isAnswered}>
              <Text style={getTextStyle(option)}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ImagedLayout>
  );
};

export default QuizQuestion;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scoreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 18,
    color: '#fff',
    marginRight: 5,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 18,
    color: '#fff',
    marginRight: 5,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressTotal: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 2,
  },
  questionContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
