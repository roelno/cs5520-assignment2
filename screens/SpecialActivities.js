import { StyleSheet, View, FlatList } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useActivities } from '../components/ActivityContent'
import colors from '../constants/Colors';
import PressableButton from '../components/PressableComponent';
import { StatusBar } from 'expo-status-bar';
import ActivityList from '../components/ActivitiesList';
import { Entypo } from '@expo/vector-icons';

const SpecialActivities = ({navigation}) => {
    const { activities } = useActivities();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <PressableButton
                    onPress={() => navigation.navigate('AddOrEditActivity', { screenTitle: 'Special...' })}
                    isEnabled={true}
                    styleOverride={{ marginRight: 10, backgroundColor: colors.primary, borderRadius: 5, elevation: 0, marginTop: 0 }}
                >
                    <Entypo name="plus" size={24} color="white" />
                </PressableButton>
               
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ActivityList navigation={navigation} activities={activities} onlySpecial={true} />
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
        color: colors.primaryText, 
        fontSize: 18, 
        fontWeight: 'bold', 
    },
})