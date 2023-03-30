import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import { GestureDetector, GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function App() {
  const scaleZoom = useSharedValue(1);
  const tranlateXZoom = useSharedValue(0);
  const tranlateYZoom = useSharedValue(0);
  const { height, width } = useWindowDimensions();


  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const AnimatedView = Animated.createAnimatedComponent(View);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      // console.log(event)
      scaleZoom.value = event.scale;
      tranlateXZoom.value = event.focalX;
      tranlateYZoom.value = event.focalY;
    },
    onEnd: (event) => {
      console.log(event);
      scaleZoom.value = withTiming(1);
      tranlateXZoom.value = withTiming(width);
      tranlateYZoom.value = withTiming(height);
    }
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: tranlateXZoom.value },
        { translateY: tranlateYZoom.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scaleZoom.value },
        { translateX: -tranlateXZoom.value },
        { translateY: -tranlateYZoom.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ]
    }
  })

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <AnimatedImage
          source={{ uri: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTHA8sTYngrF9FsGFcsv_vq3_ULeEG7DvrsIJLohckJnRPw4XBAx-Z9wQ6XOhMc-pzpaijFkpUWC86SKqE' }}
          style={[styles.image, rStyle]}
        />
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
