import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { images } from '@/assets/images';
import CountDown from '@/components/CountDown';
import { getFontSize, SCREEN_WIDTH } from '@/constants';
import { qmColors } from '@/constants/Colors';
import { getLabel, modifyResponseFromAPI, Response } from '@/constants/data';
import useBackHandler from '@/hook/useBackHandler';
import { getQuestion } from '@/service';

type SelectedAnswer = {
  index: number | undefined;
  answer: string | undefined | number;
};

const Question = () => {
  useBackHandler();
  const [questions, setQuestions] = useState<Response[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<SelectedAnswer>({
    index: undefined,
    answer: undefined,
  });
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [duration, setDuration] = useState(10);

  const handleAnswer = useCallback((option: SelectedAnswer) => {
    let updatedScore = score;
    let updatedTotalTime = totalTime;
    setSelectedOption(option);

    if (option.answer === questions[currentQuestionIndex]?.correct_answer) {
      updatedScore += 1;
      setScore(updatedScore);
    }
    setTimeout(() => {
      if (questions.length === currentQuestionIndex + 1) {
        setDuration(10)
        setTotalTime(0)
        setQuestions([])
        router.push({ pathname: '/result', params: { score: JSON.stringify(updatedScore), totalTime: JSON.stringify(updatedTotalTime) } });
      } else {
        if (option.answer) {
          setDuration(10)
        }
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption({
          index: undefined,
          answer: undefined,
        });
      }
    }, 1000);
  }, [questions, currentQuestionIndex, score, totalTime]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestion();
      setQuestions(modifyResponseFromAPI(fetchedQuestions));
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalTime((prev) => prev + 1);
      setDuration((prev) => {
        if (prev <= 1) {
          handleAnswer({ index: undefined, answer: undefined });
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleAnswer]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ImageBackground source={images.app_bg} style={styles.container}>
      {!currentQuestion ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.timerContainer}>
              <MaterialCommunityIcons name="timer-outline" size={22} color={qmColors.white} />
              <Text style={styles.timer}>
                {`${String(Math.floor(totalTime / 60)).padStart(2, '0')}:${String(totalTime % 60).padStart(2, '0')}`}
              </Text>
            </View>
            <View style={styles.countdownContainer}>
              <CountDown seconds={duration} />
            </View>
          </View>
          <View style={styles.questionContainer}>
            <View style={styles.questionWrapper}>
              <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
              <Text style={styles.question}>{currentQuestion.question}</Text>
            </View>
          </View>
          <View style={styles.answerContainer}>
            <Text style={styles.instructions}>Choose Correct Option</Text>
            <View style={styles.answerWrapper}>
              {currentQuestion.allAnswers?.map((answer, index) => (
                <AnswerBtn
                  key={index}
                  isCorrect={selectedOption.answer === currentQuestion.correct_answer}
                  isSelected={selectedOption.answer === answer}
                  onPress={() => handleAnswer({ index, answer })}
                  disable={!!selectedOption.answer}
                  option={answer}
                  label={getLabel(index)}
                  // label={answer === currentQuestion?.correct_answer? '0': 'x'}
                />
              ))}
            </View>
          </View>
        </>
      )}
    </ImageBackground >
  );
};

const AnswerBtn = ({ isCorrect, isSelected, onPress, disable, option, label }: {
  isCorrect: boolean;
  isSelected: boolean;
  onPress: () => void;
  disable: boolean;
  option: string;
  label: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disable}
    style={[
      styles.answerBtn,
      {
        borderColor: isSelected
          ? isCorrect
            ? qmColors.green_1
            : qmColors.red_1
          : qmColors.white_2,
        backgroundColor: isSelected
          ? isCorrect
            ? qmColors.green_2
            : qmColors.red_2
          : qmColors.white_2,
      },
    ]}
  >
    <View style={styles.answerContent}>
      <Text style={[styles.label, isSelected && styles.selectedText]}>{label}</Text>
      <Text style={[styles.content, isSelected && styles.selectedText]}>
        {decodeURIComponent(option)}
      </Text>
    </View>
    {isSelected && (
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={isCorrect ? "check-circle" : "cancel"}
          size={24}
          color={isCorrect ? qmColors.green_1 : qmColors.red_1}
        />
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight || 16) + getFontSize(16),
    backgroundColor: qmColors.app_color,
    padding: getFontSize(16),
    gap: getFontSize(30),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerContainer: {
    flexDirection: 'row',
    gap: getFontSize(5),
    alignItems: 'center',
  },
  timer: {
    color: qmColors.white,
    fontSize: getFontSize(14),
    fontFamily: 'SpaceGrotesk_300Light',
  },
  countdownContainer: {
    position: 'absolute',
    left: (SCREEN_WIDTH / 2) - getFontSize(40),
  },
  questionContainer: {
    elevation: 2,
    borderRadius: getFontSize(20),
    height: getFontSize(200),
    backgroundColor: qmColors.app_color_2,
    padding: getFontSize(8),
  },
  questionWrapper: {
    backgroundColor: qmColors.white,
    flex: 1,
    borderRadius: getFontSize(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: getFontSize(20),
    paddingHorizontal: getFontSize(20),
  },
  questionNumber: {
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: getFontSize(20),
  },
  question: {
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: getFontSize(16),
    color: qmColors.black_1,
  },
  answerContainer: {
    padding: getFontSize(8),
  },
  instructions: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: getFontSize(18),
    color: qmColors.white,
    marginBottom: getFontSize(16),
  },
  answerWrapper: {
    gap: getFontSize(20),
  },
  answerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: getFontSize(100),
    height: getFontSize(70),
    paddingHorizontal: getFontSize(24),
    borderWidth: getFontSize(4),
    justifyContent: 'space-between',
  },
  answerContent: {
    gap: getFontSize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: getFontSize(18),
    color: qmColors.black,
  },
  content: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: getFontSize(16),
    color: qmColors.black_1,
  },
  selectedText: {
    color: qmColors.white_2,
  },
  iconContainer: {
    marginRight: getFontSize(10),
  },
  loading: {
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: getFontSize(20),
    color: qmColors.white_1
  }
});

export default Question;