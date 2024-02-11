import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

const CustomButton = ({ title, onPress, isEnabled, styleOverride, textStyleOverride }) => {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                !isEnabled && styles.disabledButton,
                styleOverride
            ]} 
            onPress={isEnabled ? onPress : null}
            activeOpacity={isEnabled ? 0.7 : 1}
        >
            <Text style={[
                styles.buttonText, 
                !isEnabled && styles.disabledText,
                textStyleOverride
            ]}>
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
        elevation: 3,
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
