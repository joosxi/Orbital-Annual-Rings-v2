import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

const MedicationAlarmScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>
            Welcome to the Medication Alarm Screen
            </Text>
        </View>
    )
};

export default MedicationAlarmScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});