// app/(tabs)/index.tsx
import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendRaceNotification } from '@/utils/notifications';




const { width, height } = Dimensions.get('window');
const HORSE_COUNT = 5;
const TRACK_HEIGHT = height - 300;

const getRandomDuration = () => 2000 + Math.random() * 3000;

export default function RaceScreen() {
    const [isRunning, setIsRunning] = useState(false);
    const [winner, setWinner] = useState<number | null>(null);
    const horses = useRef(
        Array(HORSE_COUNT).fill(0).map(() => new Animated.Value(0))
    ).current;

    const startRace = async () => {
        if (winner !== null || isRunning) {
            Alert.alert(
              'Подожди!',
              'Сначала нажми "Рестарт", чтобы начать новую гонку.',
              [{ text: 'Ок' }]
            );
            return;
          }
        setIsRunning(true);
        setWinner(null);

        horses.forEach((horse) => horse.setValue(0));
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

            await sendRaceNotification(winnerIndex);
        });
    };

    const resetRace = () => {
        horses.forEach((horse) => horse.setValue(0));
        setWinner(null);
    };

    return (
        <SafeAreaView style={styles.container}>


            <ImageBackground
                source={require('../../assets/images/track.png')}
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
                                   <Image source={require('../../assets/images/horse.png')} style={styles.horseImage} resizeMode='contain' />
                                </Animated.View>
                              
                                    <Image source={require('../../assets/images/flag.png')} style={styles.finishFlag} resizeMode='contain'/>
                             
                            </View>
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity  onPress={startRace} disabled={isRunning}>
                       <Text  style={styles.btn}>Старт</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={resetRace} disabled={isRunning} >
                        <Text style={styles.btn}>Рестарт</Text>
                        </TouchableOpacity>
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
        paddingBottom: 140,
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
        width: 50,
        height: 50,
        bottom: 15,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btn:{
        fontSize: 30,
        color: "black",
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        marginTop: 20
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
