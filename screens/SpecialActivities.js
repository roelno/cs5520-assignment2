import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useActivities } from '../components/ActivityContent'
import colors from '../constants/Colors';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import ActivityCard from '../components/ActivityCard';

const SpecialActivities = ({navigation}) => {
    const { activities } = useActivities();
    const specialActivities = activities.filter(activity => activity.isSpecial);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CustomButton
                    onPress={() => navigation.navigate('AddActivity', { screenTitle: 'Special...' })}
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
                data={specialActivities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ActivityCard item={item} />
                )}
            />
        </View>
    )
}

export default SpecialActivities

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    buttonText: {
        color: colors.primaryText, // Adjust this color to match your navigation title
        fontSize: 18, // This is a common title size, but adjust as needed
        fontWeight: 'bold', // Most navigation titles are bold
    },
})