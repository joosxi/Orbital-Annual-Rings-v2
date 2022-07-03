import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
    Dimensions,
    FlatList,
    ToastAndroid,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    addDoc,
    onSnapshot,
    query,
    collection,
    doc,
    deleteDoc,
    where,
    getDoc
} from 'firebase/firestore';

import { auth, db } from '../../firebase';
import InputStore from '../../components/InputStore'

const INPUT_PLACEHOLDER = 'Enter your contact and hit Add';
const THEME = '#407BFF';

const { width } = Dimensions.get('window');

const CloseFriendsScreen = () => {
    const [contact, setContact] = useState('');
    const [contactsList, setContactsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Expensive operation. Consider your app's design on when to invoke this.
        // Could use Redux to help on first application load.
        const contactsQuery = query(collection(db, 'contacts'), where('userId', '==', auth.currentUser.uid));

        const unsubscribe = onSnapshot(contactsQuery, (snapshot) => {
            const contacts = [];

            snapshot.forEach((doc) => {
                contacts.push({ id: doc.id, ...doc.data() });
            });

            setContactsList([...contacts]);
        });

        return unsubscribe;
    }, [onSubmitHandler]);

    const showRes = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };

    // https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9
    // https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9_7
    const onSubmitHandler = async () => {
        if (contact.length === 0) {
            showRes('Contacts description cannot be empty!');
            return;
        }

        try {
            const contactRef = await addDoc(collection(db, 'contacts'), {
                desc: contact,
                completed: false,
                userId: auth.currentUser.uid
            });

            console.log('onSubmitHandler success', contactRef.id);
            showRes('Successfully added contact!');
            clearForm();
        } catch (err) {
            console.log('onSubmitHandler failure', err);
            showRes('Failed to add contact!');
        }
    };

    const onDeleteHandler = async (id) => {
        try {
            await deleteDoc(doc(db, 'contacts', id));

            console.log('onDeleteHandler success', id);
            showRes('Successfully deleted contact!');
        } catch (err) {
            console.log('onDeleteHandler failure', err);
            showRes('Failed to delete contact!');
        }
    };

    const clearForm = () => {
        setContact('');
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.headerText}>Your Contacts 👋🏻</Text>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={contactsList}
                            renderItem={({ item, index }) => (
                                <InputStore
                                    data={item}
                                    key={index}
                                    onDelete={onDeleteHandler}
                                />
                            )}
                            style={styles.list}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        onChangeText={setContact}
                        value={contact}
                        selectionColor={THEME}
                        placeholder={INPUT_PLACEHOLDER}
                        style={styles.contactInput}
                    />
                    <Pressable
                        onPress={onSubmitHandler}
                        android_ripple={{ color: 'white' }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default CloseFriendsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    listContainer: {
        flex: 1,
        paddingBottom: 70, // Fix: Temporary workaround
    },
    list: {
        overflow: 'scroll',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 32,
        marginLeft: 14,
        marginTop: 14,
        marginBottom: 10,
        color: THEME,
    },
    formContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#FAF9F6',
    },
    contactInput: {
        width: width * 0.7,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#E0D4B0',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    button: {
        width: width * 0.22,
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: THEME,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});
