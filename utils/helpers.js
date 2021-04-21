import * as Notifications from "expo-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage'


const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Notifications.getPermissionsAsync().then(
                    ({status}) => {
                        if (status === 'granted') {

                            Notifications.setNotificationHandler({
                                handleNotification: async () => ({
                                    shouldShowAlert: true,
                                    shouldPlaySound: false,
                                    shouldSetBadge: false,
                                }),
                            });

                            Notifications.cancelAllScheduledNotificationsAsync().catch((err) =>
                                console.log('Error Clearing Notifications')
                            );

                            let trigger = new Date();
                            trigger.setDate(trigger.getDate() + 1)
                            trigger.setHours(12, 0, 0)
                            Notifications.scheduleNotificationAsync({
                                content: {
                                    title: 'Attempt Quiz!',
                                    body: "👋 don't forget to attempt your quiz for today!"
                                },
                                trigger
                            }).catch((error) => {
                                console.log('Error Scheduling Notification')
                                console.log(error)
                            })
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    }
                );
            }
        });
}
