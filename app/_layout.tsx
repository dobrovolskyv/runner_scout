// app/_layout.tsx
import { Slot, usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '@/utils/notifications';

export default function AppLayout() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        registerForPushNotificationsAsync();
        (async () => {
            if (__DEV__) {

                // await AsyncStorage.removeItem('hasVisited');
            }

            const visited = await AsyncStorage.getItem('hasVisited');
            if (!visited && pathname !== '/welcome') {
                console.log('redirecting...');
                router.replace('/welcome');
                return;
            }
            setLoading(false);
        })();
    }, [pathname]);


    if (loading) return null;

    return <Slot />;
}
