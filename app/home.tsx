import { Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '@/assets/images'
import { getFontSize } from '@/constants'
import { qmColors } from '@/constants/Colors'
import Tag from '@/components/Tag'
import { AntDesign, EvilIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import TopGamers from '@/components/TopGamers'
import ReferAndEarn from '@/components/ReferAndEarn'

const Home = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.home_bg} style={styles.image}>
        <View style={styles.rowCenter}>
          <View style={styles.emojiWrapper}>
            <Image source={images.emoji_1} style={styles.emoji} />
          </View>
          <View style={[styles.rowCenter, { gap: getFontSize(10) }]}>
            <Tag content={"0"}
              leftIcon={<MaterialCommunityIcons name="eraser" size={getFontSize(16)} color={qmColors.white_1} style={{ marginRight: getFontSize(5) }} />}
            />
            <Tag content={"₦5,000.00"}
              rightIcon={<EvilIcons name="plus" size={getFontSize(16)} color={qmColors.app_color} />}
              fill />
            <TouchableOpacity style={{ width: getFontSize(22), height: getFontSize(22), marginLeft: getFontSize(5) }}>
              <SimpleLineIcons name="bell" size={getFontSize(22)} color={qmColors.white_1} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={{ fontFamily: 'DMSans_700Bold', color: qmColors.white_1, fontSize: getFontSize(24), marginTop: getFontSize(20) }}>Hello QM Tech</Text>
          <Text style={{ fontFamily: 'SpaceGrotesk_400Regular', color: qmColors.white_1, fontSize: getFontSize(16), marginTop: getFontSize(10) }}>
            Let’s play and Earn</Text>
        </View>
      </ImageBackground>
      <ImageBackground
        source={images.home_banner}
        style={{
          backgroundColor: qmColors.white,
          height: getFontSize(246),
          position: 'absolute', top: getFontSize(273),
          borderRadius: getFontSize(20),
          alignSelf: 'center',
          elevation: 1,
          overflow: 'hidden',
          width: '93%',
        }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AntDesign name="questioncircle" color={qmColors.blue_2} size={18} style={{ alignSelf: 'flex-end', marginRight: getFontSize(24) }} />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'DMSans_700Bold', fontSize: getFontSize(20), color: qmColors.blue_1 }}>Game Prize</Text>
            <Text style={{ fontFamily: 'DMSans_700Bold', fontSize: getFontSize(44), color: qmColors.blue_1 }}>₦1,000,000</Text>
            <Text style={{ fontFamily: 'SpaceGrotesk_500Medium', fontSize: getFontSize(12), color: qmColors.blue_1 }}>Next Game: Tomorrow, 8PM </Text>
          </View>
        </View>
        <View style={{
          padding: getFontSize(24),
          height: getFontSize(63),
          backgroundColor: qmColors.app_color, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Pressable
            onPress={() => router.push('/question')}
            style={{
              backgroundColor: qmColors.white, height: getFontSize(28), borderRadius: getFontSize(24),
              paddingHorizontal: getFontSize(16),
              justifyContent: 'center', alignItems: 'center'
            }}>
            <Text style={{ color: qmColors.app_color_1, fontFamily: 'SpaceGrotesk_500Medium', fontSize: getFontSize(12) }}>
              Join now
            </Text>
          </Pressable>
          <View style={{
            height: getFontSize(28),
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: qmColors.white, fontFamily: 'SpaceGrotesk_500Medium', fontSize: getFontSize(12) }}>
              Entry Fee ₦100.00
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{ marginTop: getFontSize(140) }}>
        <TopGamers />

        <ReferAndEarn />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: qmColors.white,
  },
  image: {
    height: getFontSize(400),
    padding: getFontSize(16),
    paddingTop: (StatusBar.currentHeight || 16) + getFontSize(16),
    borderBottomEndRadius: getFontSize(60),
    backgroundColor: qmColors.app_color_1,
    overflow: 'hidden',
  },
  emojiWrapper: {
    width: getFontSize(40),
    height: getFontSize(40),
    borderRadius: getFontSize(40),
    backgroundColor: qmColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    padding: getFontSize(15),
  },
  rowCenter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
})