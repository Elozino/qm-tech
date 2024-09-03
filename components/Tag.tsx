import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFontSize } from '@/constants'
import { qmColors } from '@/constants/Colors'

const Tag = ({ content, fill, rightIcon, leftIcon }: { content: string | React.ReactNode, fill?: boolean; rightIcon?: React.ReactElement; leftIcon?: React.ReactElement; }) => {
  return (
    <View style={[styles.container, { backgroundColor: fill ? qmColors.white_1 : 'transparent' }]}>
      {leftIcon}
      <Text style={{ color: fill ? qmColors.app_color_1 : qmColors.white_1, ...styles.text }}>{content}</Text>
      {rightIcon}
    </View>
  )
}

export default Tag

const styles = StyleSheet.create({
  container: {
    borderRadius: getFontSize(24),
    borderWidth: getFontSize(1.2),
    borderColor: qmColors.white_1,
    paddingHorizontal: getFontSize(10),
    paddingVertical: getFontSize(2),
    flexDirection: 'row',
    alignItems: 'center',
    height: getFontSize(28),
  },
  text: {
    fontWeight: '500',
    fontSize: getFontSize(12),
    fontFamily: 'SpaceGrotesk_700Bold'
  }
})