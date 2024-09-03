import { Dimensions, PixelRatio } from "react-native";

// export const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

const fontScale = PixelRatio.getFontScale();
export const getFontSize = (size: number) => size / fontScale;

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const totalQuestion = 10