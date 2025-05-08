import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Slot, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Applayout() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(()=>{
        (async ()=>{
            const visited = await AsyncStorage.getItem('hasVisited')
            if (visited) {
                router.replace('/welcome')
            }
            setLoading(false)   
        })
    },[])

    if(loading) return null
    return (
        <Slot/>
    )
}