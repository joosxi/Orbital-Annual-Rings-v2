import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Alert, Keyboard } from 'react-native';

import AuthTextInput from '../../components/auth/AuthTextInput';
import AuthPressable from '../../components/auth/AuthPressable';

import {
    createUserWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '../../firebase/index';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpToast = () => {
        Alert.alert(
            "Sign up successful!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    };

    const missingFieldsToast = () => {
        Alert.alert(
            "Missing Fields",
            "Missing email and/or password",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    };

    const restoreForm = () => {
        setEmail('');
        setPassword('');
        Keyboard.dismiss();
    };

    const signUpHandler = async () => {
        if (email.length === 0 || password.length === 0) {
            missingFieldsToast();
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;

                // To show the user object returned
                console.log(user);

                restoreForm();
                //signUpToast();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error('[signUpHandler]', errorCode, errorMessage);
            });
    };

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}> 
                
                <Text style={styles.textTitle}>Let's Get Started</Text>
                <Text style={styles.textBody}>Create an account to use Annual Rings</Text>
                
                <AuthTextInput
                    value={email}
                    placeholder="Your Email"
                    textHandler={setEmail}
                    keyboardType="email-address"
                />
                <AuthTextInput
                    value={password}
                    placeholder="Your Password"
                    textHandler={setPassword}
                    secureTextEntry
                />
                

                <AuthPressable
                    onPressHandler={signUpHandler}
                    title={'Register'}
                />


                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textBody}>Aiready have an account</Text>
                    <TouchableOpacity 
                        style={[styles.textBody, {color: 'blue'}]} 
                        onPress={() => navigation.navigate('Main')}
                    > 
                        <Text>Login here</Text>
                    </TouchableOpacity>

                </View>
            </View>
            
        </ScrollView>    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10,
    },
    textTitle: {
        fontSize: 40,
        fontFamily: 'sans-serif',
        marginVertical: 5
    },
    textBody: {
        fontSize: 16,
        fontFamily: 'sans-serif'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    }
});

export default RegisterScreen;