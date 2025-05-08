// app/(tabs)/index.tsx
import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions, ImageBackground, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import TrackImg from "../../assets/images/track.png"
import Flag from "../../assets/images/flag.png"
import Horse from "../../assets/images/horse.png"

const { width, height } = Dimensions.get('window');
const HORSE_COUNT = 5;
const TRACK_HEIGHT = height - 280;

const getRandomDuration = () => 2000 + Math.random() * 3000;

export default function RaceScreen() {
    const [isRunning, setIsRunning] = useState(false);
    const [winner, setWinner] = useState<number | null>(null);
    const horses = useRef(
        Array(HORSE_COUNT).fill(0).map(() => new Animated.Value(0))
    ).current;

    const startRace = async () => {
        setIsRunning(true);
        setWinner(null);
        const durations = horses.map(() => getRandomDuration());

        const animations = horses.map((horse, index) =>
            Animated.timing(horse, {
                toValue: TRACK_HEIGHT,
                duration: durations[index],
                useNativeDriver: false,
            })
        );

        Animated.parallel(animations).start(async () => {
            const winnerIndex = durations.indexOf(Math.min(...durations));
            setWinner(winnerIndex);
            setIsRunning(false);

            await AsyncStorage.setItem(
                `race_${Date.now()}`,
                JSON.stringify({ winner: winnerIndex + 1, time: new Date().toLocaleString() })
            );

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Результаты скачек',
                    body: `Победила лошадь №${winnerIndex + 1}!`,
                },
                trigger: null,
            });
        });
    };

    const resetRace = () => {
        horses.forEach((horse) => horse.setValue(0));
        setWinner(null);
    };

    return (
        <SafeAreaView style={styles.container}>


            <ImageBackground
                source={TrackImg}
                style={{ width, height }}
                resizeMode='stretch'
            >
                <View style={styles.wrapper}>

                    <View style={styles.track} >
                        {horses.map((anim, index) => (
                            <View key={index} style={styles.lane}>
                                <Animated.View
                                    style={[styles.horse, { transform: [{ translateY: anim }] }]}
                                >
                                   <Image source={Horse} style={styles.horseImage} resizeMode='contain' />
                                </Animated.View>
                              
                                    <Image source={Flag} style={styles.finishFlag} resizeMode='contain'/>
                             
                            </View>
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button style={styles.btn} title="Старт" onPress={startRace} disabled={isRunning} />
                        <Button style={styles.btn} title="Рестарт" onPress={resetRace} disabled={isRunning} />
                    </View>
                    <View style={styles.resultWrapper}>
                        {winner !== null && (
                            <Text style={styles.result}>Победила лошадь №{winner + 1}!</Text>
                        )}
                    </View>
                </View>
            </ImageBackground>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    background: {
        flex: 1,
        width,
        height,

    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 150,
      },
    track: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 0,
    },
    lane: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
        position: 'relative',
        borderLeftWidth: 2,
        borderLeftColor: '#ddd',
        flexDirection: 'column',
    },
    horse: {
        position: 'absolute',
        top: 0,
        right: 10
    },
    horseImage:{
        width: 40,
        height: 40
    },
    finishFlag: {
        position: 'absolute',
        width: 40,
        height: 40,
        bottom: 30,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btn:{
        fontSize: 30,
        color: "white"
    },
    resultWrapper: {
        height: 60
    },
    result: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
});
