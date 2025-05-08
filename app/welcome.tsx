import { View, StyleSheet, ImageBackground, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const Welcome = () => {
    const router = useRouter();

    const handleStart = async () => {
        await AsyncStorage.setItem('hasVisited', 'false')
        router.replace('/(tabs)')
    }

    console.log('welcome screen visible')
    return (
        <View  >
            <TouchableWithoutFeedback onPress={handleStart}>
                <ImageBackground source={require('../assets/images/welcome.png')} resizeMode='stretch' style={styles.container} />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       width,
       height
   

    },

});

export default Welcome;