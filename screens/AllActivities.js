import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, {useLayoutEffect} from 'react'
import { useActivities } from '../components/ActivityContent'
import colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/CustomButton';

const AllActivities = ({ navigation }) => {
    const { activities } = useActivities();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CustomButton
                    onPress={() => navigation.navigate('AddActivity', { screenTitle: 'All Activities' })}
                    title="Add"
                    isEnabled={true}
                    styleOverride={{ marginRight: 10, backgroundColor: colors.primary, borderRadius: 5, elevation: 0, marginTop: 0 }}
                    textStyleOverride={{
                        color: colors.secondary,
                        fontSize: 18, 
                        fontWeight: 'bold', 
                    }}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={activities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.type} - Duration: {item.duration} mins {item.isSpecial ? '(Special)' : ''}</Text>
                )}
            />
        </View>
    )
}

export default AllActivities

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
})