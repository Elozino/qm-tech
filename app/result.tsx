import { Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/assets/images'
import { getFontSize, totalQuestion } from '@/constants'
import { qmColors } from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'

const Result = () => {
  const { score, totalTime } = useLocalSearchParams()

  return (
    <ImageBackground
      source={images.app_bg}
      style={[
        StyleSheet.absoluteFill,
        { paddingTop: (StatusBar.currentHeight || 16) + getFontSize(32), backgroundColor: qmColors.app_color, padding: getFontSize(16), paddingBottom: getFontSize(32) }]}>
      <View style={{ gap: getFontSize(24), flex: 1 }}>
        <Text style={{ fontFamily: 'DMSans_700Bold', color: qmColors.white_2, fontSize: getFontSize(24), textAlign: 'center' }}>Results</Text>
        <View style={[styles.boxContainer, { height: getFontSize(100), }]}>
          <View style={[styles.boxWrapper]}>
            <Text style={styles.boxText}>Total Time Used: {''}
              {`${String(Math.floor(Number(JSON.parse(totalTime as string)) / 60)).padStart(2, '0')}:${String(Number(JSON.parse(totalTime as string)) % 60).padStart(2, '0')}`}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: getFontSize(20) }}>
              <Score score={JSON.parse(score as string)} type={'correct'} />
              <View style={{ height: getFontSize(20), width: getFontSize(2), backgroundColor: qmColors.gray_1 }} />
              <Score score={totalQuestion - Number(JSON.parse(score as string))} type={'incorrect'} />
            </View>
          </View>
        </View>
        <View style={[styles.boxContainer, { height: getFontSize(256), }]}>
          <View style={[styles.boxWrapper, { justifyContent: 'flex-start' }]}>
            <Image
              source={Number(score) > 8 ? images.happy_emoji : images.sad_emoji}
              style={{ width: getFontSize(100), height: getFontSize(100) }}
              resizeMode='contain'
            />
            <Text style={[styles.boxText, { fontSize: getFontSize(16) }]}>
              {Number(score) > 8 ? 'Congratulations You Won 🎉' : ' Better luck next time \n  \n Sorry you Didn’t win'}
            </Text>
            {/* <Text style={styles.boxText}>Sorry you Didn’t win</Text> */}
          </View>
        </View>
      </View>
      <View style={{ position: 'relative' }}>
        <LinearGradient
          colors={[qmColors.gradient_1, qmColors.gradient_2]}
          style={styles.shadow}
        />
        <Pressable
          onPress={() => { router.replace('/home') }}
          style={styles.btn}>
          <Text style={styles.btnText}>Go Home</Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

export default Result
const Score = ({ score, type }: { score: string | number; type: 'correct' | 'incorrect' }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: getFontSize(10) }}>
      <Text style={{ fontFamily: 'SpaceGrotesk_700Bold', fontSize: getFontSize(14), color: qmColors.black_1 }}>{score} {type === 'correct' ? 'correct' : 'incorrect'}</Text>
      <MaterialIcons name={type === 'correct' ? "check-circle" : "cancel"} size={20} color={type === 'correct' ? qmColors.green_2 : qmColors.red_2} />
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    elevation: 2,
    borderRadius: getFontSize(20),
    backgroundColor: qmColors.app_color_2,
    padding: getFontSize(8),
  },
  boxWrapper: {
    backgroundColor: qmColors.white,
    flex: 1,
    borderRadius: getFontSize(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: getFontSize(20),
    paddingHorizontal: getFontSize(20),
  },
  boxText: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: getFontSize(12),
    color: qmColors.black,
  },
  btn: {
    width: '100%',
    backgroundColor: qmColors.app_color_2,
    height: getFontSize(63),
    borderRadius: getFontSize(100),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5
  },
  btnText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: getFontSize(16),
    color: qmColors.gray_2
  },
  shadow: {
    width: '98%',
    backgroundColor: qmColors.gradient_1,
    height: getFontSize(63),
    borderRadius: getFontSize(100),
    position: 'absolute',
    top: getFontSize(7),
    left: getFontSize(5),
    zIndex: -1,
  }
})