import { StyleSheet, View, FlatList } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useActivities } from '../components/ActivityContent'
import colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import PressableButton from '../components/PressableComponent';
import ActivityCard from '../components/ActivitiesList';
import { Entypo } from '@expo/vector-icons';

const AllActivities = ({ navigation }) => {
    const { activities } = useActivities();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <PressableButton
                    onPress={() => navigation.navigate('AddActivity', { screenTitle: 'All Activities...' })}
                    isEnabled={true}
                    styleOverride={{ marginRight: 10, backgroundColor: colors.primary, borderRadius: 5, elevation: 0, marginTop: 0 }}
                    textStyleOverride={{
                        color: colors.secondary,
                        fontSize: 18, 
                        fontWeight: 'bold', 
                    }}
                >
                    <Entypo name="plus" size={24} color="white" />
                </PressableButton>

            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ActivityCard activities={activities} />
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