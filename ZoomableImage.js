import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { PinchGestureHandler, PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

const ZoomableView = () => {
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const baseScale = useRef(1);
    const pinchRef = useRef();
    const panRef = useRef();

    const onPinchGestureEvent = event => {
        if (event.nativeEvent) {
            setScale(baseScale.current * event.nativeEvent.scale);
        }
    };

    const onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            baseScale.current = 1;
        }
    };

    const onPanGestureEvent = event => {
        if (event.nativeEvent) {
            setTranslateX(event.nativeEvent.translationX);
            setTranslateY(event.nativeEvent.translationY);
        }
    };


    const onPanHandlerStateChange = event => {
        setTranslateX(0);
        setTranslateY(0);
        setScale(1);
    };

    return (
        <View style={styles.container}>

            <GestureHandlerRootView>
                <PinchGestureHandler
                    ref={pinchRef}
                    onGestureEvent={onPinchGestureEvent}
                    onHandlerStateChange={onPinchHandlerStateChange}
                    simultaneousHandlers={panRef}
                >
                    <PanGestureHandler
                        ref={panRef}
                        onGestureEvent={onPanGestureEvent}
                        onHandlerStateChange={onPanHandlerStateChange}
                        simultaneousHandlers={pinchRef}
                    >
                        <Image
                            source={{ uri: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTHA8sTYngrF9FsGFcsv_vq3_ULeEG7DvrsIJLohckJnRPw4XBAx-Z9wQ6XOhMc-pzpaijFkpUWC86SKqE' }}
                            style={[
                                styles.box,
                                {
                                    transform: [
                                        { scale },
                                        { translateX },
                                        { translateY },
                                    ],
                                },
                            ]} />
                    </PanGestureHandler>
                </PinchGestureHandler>
            </GestureHandlerRootView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 400,
        height: 400,
        backgroundColor: 'red',
    },
});

export default ZoomableView;
