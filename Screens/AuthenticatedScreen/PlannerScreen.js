import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

const PlannerScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>
            Welcome to the Planner Screen
            </Text>
        </View>
    )
};

export default PlannerScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});