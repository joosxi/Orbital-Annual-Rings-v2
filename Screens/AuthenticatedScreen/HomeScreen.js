import { StyleSheet, View, Pressable, Text } from 'react-native';
import React from 'react';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Pressable
                onPress={() => navigation.navigate('CloseFriendsContacts')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Close Friends</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('MedicationAlarm')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Medication Alarm</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('Planner')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Planner</Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('DoctorAppointments')}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Doctor Appointments</Text>
            </Pressable>

        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#407BFF',
        marginVertical: 10,
        paddingVertical: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 4,
    },
    text: {
        color: 'white',
    },
});