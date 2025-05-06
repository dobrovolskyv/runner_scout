// screens/RaceScreen.tsx
import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const HORSE_COUNT = 5;
const TRACK_LENGTH = width - 100;

const getRandomDuration = () => 2000 + Math.random() * 3000;

const RaceScreen: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [winner, setWinner] = useState<number | null>(null);
    const horses = useRef<Animated.Value[]>(
        Array.from({ length: HORSE_COUNT }, () => new Animated.Value(0))
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
        horses.forEach(horse => horse.setValue(0));
        setWinner(null);
    };

    return (
        <View style={styles.container}>
            {horses.map((anim, index) => (
                <Animated.View
                    key={index}
                    style={[styles.horse, { transform: [{ translateX: anim }] }]}
                >
                    <Text>🐎 Лошадь {index + 1}</Text>
                </Animated.View>
            ))}
            <View style={styles.buttonContainer}>
                <Button title="Старт" onPress={startRace} disabled={isRunning} />
                <Button title="Рестарт" onPress={resetRace} disabled={isRunning} />
            </View>
            {winner !== null && <Text style={styles.result}>Победила лошадь №{winner + 1}!</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    horse: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#eef',
        borderRadius: 10,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    result: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RaceScreen;
