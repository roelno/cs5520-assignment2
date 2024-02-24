import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import TextInputField from '../components/TextInput'
import CustomButton from '../components/CustomButton'
import colors from '../constants/Colors'

const Start = ({route}) => {
    const { authenticationHandler } = route.params;

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }
    const isValidPhoneNumber = (phoneNumber) => {
        return /^\d{10}$/.test(phoneNumber);
    }

    const resetAllUserInput = () => {
        setEmail('');
        setEmailError('');
        setPhoneNumber('');
        setPhoneNumberError('');
    }

    const isStartEnable = email.length > 0 || phoneNumber.length > 0;

    const onConfirm = () => {
        let isValid = true;

        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            setPhoneNumberError('Please enter a valid phone number');
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        if (isValid) {
            authenticationHandler(true);
        }
    }

    return (
        
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.hint}>Email Address</Text>
            <TextInputField
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType='email-address'
                errorMessage={emailError}
            />

            <Text style={styles.hint}>Phone Number</Text>
            <TextInputField
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType='phone-pad'
                errorMessage={phoneNumberError}
            />

            <View style={styles.buttonContainer}>
                <CustomButton
                    title='Reset'
                    onPress={() => resetAllUserInput() }
                    isEnabled={true}
                />
                <CustomButton
                    title='Confirm'
                    onPress={() => onConfirm()}
                    isEnabled={isStartEnable}
                />
            </View>

        </View>
        
    )
}

export default Start

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    hint: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
      },
})