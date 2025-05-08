import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

const welcome = () => {
    const router = useRouter();

    const handleStart = async () => {
        await AsyncStorage.setItem('hasVisited', 'true')
        router.replace('/(tabs)')
    }
    return (
        <View>
            <Text>WelcomeScreen</Text>
            <Button title="GO" onPress={handleStart}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    text: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
});

export default welcome