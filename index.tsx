import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View,Text,  Animated } from 'react-native';

const DOTS = 3;
const DURATION = 300;
const COLOR = 'black';
const TYPE = 'threedots';
const seqDots = [...Array<number>(DOTS).keys()];

type DotProps = {
  active: boolean, 
  size: number, 
  color?: string, 
  duration?: number 
}

type TypeLoaderProps = {
  active: number,
  color?: string,
  hasBg?: boolean,
  speed?: number,
  size?: number,
}

type LoaderProps = {
  type?: string,
  color?: string,
  size?: number,
  speed?: number,
  hasBg?: boolean,
  bgColor?: string,
}

export default function Loader({type=TYPE, color=COLOR, speed=DURATION, size}: LoaderProps) {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(active > seqDots.length - 1 ? 0 : active + 1);
    }, speed);
    return () => clearInterval(interval);
  })

  switch(type) {
    case 'txtloader':
      return <TxtLoader {...{active, color, size}} />
    default: 
      return <ThreeDotsLoader {...{active, color, size}} />
  }
}

const ThreeDotsLoader = ({active, speed, color, size=5}: TypeLoaderProps) => {
  return (
    <View style={styles.container}>
      {
        seqDots.map((i, idx) => 
          <Dot 
            key={idx} 
            active={i === active} 
            duration={speed}
            {...{color, size}}
          />
        )
      }
    </View>
  )
}

const TxtLoader = ({speed, color, active, size=2}: TypeLoaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: size * 10, top: size * 2, paddingRight: size, color}}>Loading</Text>
      {
        seqDots.map((i, idx) => 
          <Dot
            key={idx}
            active={i === active}
            duration={speed}
            {...{color, size}}
          />
        )
      }
    </View>
  )
}

const Dot = ({active, color, duration, size}: DotProps) => {
  const animationValue = useRef(new Animated.Value(1)).current;

  const scaleDot = () => {
    Animated.sequence([
      Animated.timing( animationValue, {
        duration,
        toValue: 2,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }

  useEffect(() => {if(active) scaleDot()});

  return (
      <Animated.View 
        style={{
          transform: [{ scale: animationValue }],
          width: size,
          height: size,
          borderRadius: size / 2,
          marginHorizontal: size * 1.5,
          backgroundColor: color,
        }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
