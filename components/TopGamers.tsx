import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFontSize } from '@/constants'
import { qmColors } from '@/constants/Colors'
import { images } from '@/assets/images'
import { gamer } from '@/constants/data'


const TopGamers = () => {
  return (
    <View style={{ marginHorizontal: getFontSize(16) }}>
      <Text style={{ fontSize: getFontSize(16), fontFamily: 'SpaceGrotesk_700Bold', color: qmColors.gray_2 }}>Top Gamers of the Day</Text>
      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: getFontSize(24), gap: getFontSize(16), justifyContent: 'space-between' }}>
        {gamer.map((item, index) => (
          <View key={index} style={{ gap: getFontSize(2), alignItems: 'center' }}>
            <View style={{ backgroundColor: item?.bg_color, borderRadius: getFontSize(30), padding: getFontSize(16), width: getFontSize(60), height: getFontSize(60), justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={item?.image}
                style={{ width: getFontSize(50), height: getFontSize(50) }}
              />
            </View>
            <Text style={{ fontFamily: 'SpaceGrotesk_700Bold', fontSize: getFontSize(14), color: qmColors.gray_2 }}>{item?.name}</Text>
            <Text style={{ fontFamily: 'SpaceGrotesk_400Regular', fontSize: getFontSize(12), color: qmColors.blue_3 }}>
              <Text style={{ fontWeight: '700' }}>₦ </Text>
              {item?.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default TopGamers

const styles = StyleSheet.create({})