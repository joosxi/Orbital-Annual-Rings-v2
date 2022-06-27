import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import AuthTextInput from '../../components/auth/AuthTextInput';
import AuthPressable from '../../components/auth/AuthPressable';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../../firebase';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        //Keyboard.dismiss();
    };

    const loginHandler = async () => {
        if (email.length === 0 || password.length === 0) {
            missingFieldsToast();
            return;
        }

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;

                // To show the user object returned
                console.log(user);

                restoreForm();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error('[loginHandler]', errorCode, errorMessage);
            });
    };


    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
                
                <Text style={styles.textTitle}>Annual Rings</Text>
                <Text style={styles.textBody}>Log in to your account</Text>
                <View style={{marginTop: 20}} />
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
                <View style={{width: '90%'}}>
                    <Text style={[styles.textBody]> {alignSelf: 'flex-end'}}>Forgot Password?</Text>
                </View>
                
                <AuthPressable
                    onPressHandler = {loginHandler}
                    title = {'Login'}
                />


                <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <Text style={styles.textBody}>Don't Have an account</Text>
                    <TouchableOpacity 
                        style={[styles.textBody, {color: 'blue'}]} 
                        onPress={() => navigation.navigate('Register')}
                    > 
                        <Text>Sign Up</Text>
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
        justifyContent: 'center'
    },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10
    },
    textTitle: {
        fontFamily: 'sans-serif',
        fontSize: 40,
        marginVertical: 10,
    },
    textBody: {
        fontFamily: 'sans-serif',
        fontSize: 16
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    }
});

export default LoginScreen;