import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

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

  const handleQuizFinish = () => {
    setQuizFinished(true);
    updateQuizScore(difficulty, quizId, score);
  };

  const handleAnswer = selectedAnswer => {
    if (isAnswered) return;

    setSelectedAnswer(selectedAnswer);
    setIsAnswered(true);

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);

    setTimeout(() => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        handleQuizFinish();
      }
    }, 2000);
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
      return [styles.answerText, styles.correctAnswerText];
    if (option === selectedAnswer)
      return [styles.answerText, styles.wrongAnswerText];
    return [styles.answerText, styles.disabledAnswerText];
  };

  const renderQuizSummary = () => (
    <ScrollView style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Quiz Summary</Text>
      <Text style={styles.finalScore}>
        Final Score: {score} / {quizData.questions.length}
      </Text>
      {answeredQuestions.map((item, index) => (
        <View key={index} style={styles.summaryItem}>
          <Text style={styles.summaryQuestion}>
            {index + 1}. {item.question}
          </Text>
          <Text
            style={[
              styles.summaryAnswer,
              item.isCorrect
                ? styles.correctAnswerText
                : styles.wrongAnswerText,
            ]}>
            Your answer: {item.selectedAnswer}
          </Text>
          {!item.isCorrect && (
            <Text style={[styles.summaryAnswer, styles.correctAnswerText]}>
              Correct answer: {item.correctAnswer}
            </Text>
          )}
        </View>
      ))}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('QuizPlayScreen', {difficulty})}>
        <Text style={styles.backButtonText}>Back to Quiz Selection</Text>
      </TouchableOpacity>
      <View style={{height: 30}}></View>
    </ScrollView>
  );

  if (quizFinished) {
    return (
      <ImagedLayout blur={300}>
        <SafeAreaView style={styles.safeArea}>
          {renderQuizSummary()}
        </SafeAreaView>
      </ImagedLayout>
    );
  }

  return (
    <ImagedLayout blur={300}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreWrapper}>
              <Text style={styles.scoreLabel}>Score:</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>
            <View style={styles.progressWrapper}>
              <Text style={styles.progressLabel}>Question:</Text>
              <Text style={styles.progressValue}>
                {currentQuestionIndex + 1}
              </Text>
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
        </ScrollView>
      </SafeAreaView>
    </ImagedLayout>
  );
};

export default QuizQuestion;

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    paddingBottom: 100,
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
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    shadowColor: 'rgba(255, 0, 0, 0.4)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  disabledAnswer: {
    opacity: 0.5,
  },
  answerText: {
    fontSize: 23,
    color: '#fff',
    textAlign: 'center',
  },
  correctAnswerText: {
    fontWeight: 'bold',
    // color: '#00ff00', // Bright green for correct answer text
  },
  wrongAnswerText: {
    fontWeight: 'bold',
    // color: '#ff0000', // Bright red for wrong answer text
  },
  disabledAnswerText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  scoreText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
  summaryContainer: {
    padding: 10,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryItem: {
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  summaryQuestion: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  summaryAnswer: {
    fontSize: 16,
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
