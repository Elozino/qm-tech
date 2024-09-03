import { qmColors } from '@/constants/Colors';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedProps, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

interface CountDownProps {
  seconds?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CountDown: React.FC<CountDownProps> = ({ seconds = 10 }) => {
  const strokeDasharray = '140, 140';
  const strokeDashoffset = (seconds / 10) * 140;

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: withTiming((seconds / 10) * 45 * Math.PI),
  }));

  return (
    <View style={[
      { alignItems: 'center', justifyContent: 'center', position: 'relative' },
    ]}>
      <Text style={{ color: qmColors.white_2, position: 'absolute', justifyContent: 'center' }}>{seconds}</Text>
      <Svg width={50} height={50}>
        <Circle
          cx="24"
          cy="24"
          r="22"
          stroke={'#d9d9d9'}
          strokeWidth="3.5"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={0}
          strokeLinecap={'round'}
        />
        <AnimatedCircle
          cx="24"
          cy="24"
          r="22"
          stroke={qmColors.green_3}
          strokeWidth="3.5"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap={'round'}
          animatedProps={animatedCircleProps}
        />
      </Svg>
    </View>
  );
};

export default CountDown;