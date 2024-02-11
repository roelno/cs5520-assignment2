import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import colors from '../constants/Colors';

const TextInputField = ({ value, onChangeText, keyboardType, errorMessage }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType || 'default'}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        marginTop: 12,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: colors.inputfiled,
        borderRadius: 8,
        padding: 10,
    },
    errorText: {
        color: colors.error,
        fontSize: 12,
        marginTop: 5,
    },
});

export default TextInputField;