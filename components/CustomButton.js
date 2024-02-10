import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

const CustomButton = ({ title, onPress, isEnabled }) => {
    return (
        <TouchableOpacity 
            style={[styles.button, !isEnabled && styles.disabledButton]} 
            onPress={isEnabled ? onPress : null} // Disable onPress if not enabled
            activeOpacity={isEnabled ? 0.7 : 1} // Adjust opacity when button is disabled
        >
            <Text style={[styles.buttonText, !isEnabled && styles.disabledText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        // alignItems: 'center',
        // justifyContent: 'center',
        elevation: 3, // for shadow on Android
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: colors.disabled, 
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    disabledText: {
        color: '#ccc', 
    },
});

export default CustomButton;