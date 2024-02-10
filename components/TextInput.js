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
        marginBottom: 15,
    },
    input: {
        height: 40,
        // textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: colors.secondary,
        // color: colors.secondary,
        // width: 240,
    },
    errorText: {
        // color: colors.error,
        fontSize: 12,
        marginTop: 3,
    },
});

export default TextInputField;