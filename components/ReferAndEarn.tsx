import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { qmColors } from '@/constants/Colors'
import { getFontSize } from '@/constants'
import Tag from './Tag'
import { images } from '@/assets/images'

const ReferAndEarn = () => {
  return (
    <View style={{
      backgroundColor: qmColors.blue_3, borderRadius: getFontSize(20), marginHorizontal: getFontSize(16),
      marginTop: getFontSize(32),
      padding: getFontSize(20),
      gap: getFontSize(10),
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Text style={[styles.text, { fontSize: getFontSize(18) }]}>Refer & Earn with your Friends</Text>
      <Text style={[styles.text, { fontSize: getFontSize(12), width: '70%' }]}>Share with your friends and loved ones to come and play</Text>
      <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: getFontSize(5) }}>
        <Tag content={'Invite Friends'} />
      </View>
      <Image source={images.home_share}
        resizeMode='contain'
        style={{ width: getFontSize(142), height: getFontSize(142), position: 'absolute', right: -14, top: getFontSize(3), justifyContent: 'center' }}
      />
    </View>
  )
}

export default ReferAndEarn

const styles = StyleSheet.create({
  text: { color: qmColors.white_3 }
})