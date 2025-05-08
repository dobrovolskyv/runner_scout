// screens/HistoryScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';


interface RaceResult {
    winner: number;
    time: string;
}

const HistoryScreen: React.FC = () => {
    const [history, setHistory] = useState<RaceResult[]>([]);

    useEffect(() => {
        const loadHistory = async () => {
            const keys = await AsyncStorage.getAllKeys();
            const raceKeys = keys.filter((key) => key.startsWith('race_'));
            const entries = await AsyncStorage.multiGet(raceKeys);

            const results: RaceResult[] = entries
                .map(([, value]) => (value ? JSON.parse(value) : null))
                .filter(Boolean);

            const sorted = results.sort(
                (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
            );

            setHistory(sorted);
        };

        const unsubscribe = loadHistory();
        return () => {

        };
    }, []);

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>История скачек</Text>
                {history.length === 0 ? (
                    <Text style={styles.empty}>Пока нет записей</Text>
                ) : (
                    history.map((item, index) => (
                        <View key={index} style={styles.score}>
                             <View style={styles.scoreItem}>
                                <Entypo name="bell" size={24} color="black" />
                                <Text> Победила лошадь №{item.winner}</Text>
                            </View>

                          
                            <View style={styles.scoreItem}>
                                <MaterialIcons name="access-time" size={24} color="black" />
                                <Text style={styles.time}>{item.time}</Text>
                            </View>

                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1

    },
    container: {
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    empty: {
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
    score: {
       
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: '100%',
    },
    scoreItem:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:5,
    },
    time: {
        color: '#666',
        marginTop: 5,
    },
});

export default HistoryScreen;
