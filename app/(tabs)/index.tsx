// app/(tabs)/index.tsx
import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');
const HORSE_COUNT = 5;
const TRACK_LENGTH = height - 340;

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
                toValue: TRACK_LENGTH,
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
        <View style={styles.container}>
            <View style={styles.track}>
                {horses.map((anim, index) => (
                    <View key={index} style={styles.lane}>
                        <Animated.View
                            style={[styles.horse, { transform: [{ translateY: anim }] }]}
                        >
                            <Text>🐎  {index + 1}</Text>
                        </Animated.View>
                        <View style={styles.finishFlag}>
                            <Text style={{ fontSize: 16 }}>🏁</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Старт" onPress={startRace} disabled={isRunning} />
                <Button title="Рестарт" onPress={resetRace} disabled={isRunning} />
            </View>
            <View style={styles.resultWrapper}>
                {winner !== null && (
                    <Text style={styles.result}>Победила лошадь №{winner + 1}!</Text>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    track: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        marginBottom: 20,
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
        backgroundColor: '#d2f4ea',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 10,
       
      
    },
    finishFlag: {
        position: 'absolute',
        bottom: 30,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    resultWrapper:{
        height: 60
    },
    result: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
