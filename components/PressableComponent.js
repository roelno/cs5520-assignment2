import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import colors from '../constants/Colors';

const PressableButton = ({ title, onPress, isEnabled, styleOverride, textStyleOverride, children }) => {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.button, 
                !isEnabled && styles.disabledButton,
                isEnabled && pressed ? { opacity: 0.7 } : {},
                styleOverride
            ]} 
            onPress={isEnabled ? onPress : null}
            disabled={!isEnabled} // Optionally disable the Pressable when isEnabled is false
            
        >
            <View style={styles.contentContainer}>
                {title && <Text style={[styles.buttonText, textStyleOverride]}>{title}</Text>}
                {children}
            </View>
            
        </Pressable>
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

export default PressableButton;
