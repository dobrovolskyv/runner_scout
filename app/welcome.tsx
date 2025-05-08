import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = () => {
    const router = useRouter();

    const handleStart = async () => {
        await AsyncStorage.setItem('hasVisited', 'false')
        router.replace('/(tabs)')
    }

    console.log('welcome screen visible')
    return (
        <View style={styles.container} >

            <Button title="" onPress={handleStart} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundImage: './images/welcome.png'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30
    },
});

export default Welcome;