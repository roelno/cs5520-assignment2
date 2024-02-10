import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useActivities } from '../components/ActivityContent'

const SpecialActivities = ({navigation}) => {
    const { activities } = useActivities();
    const specialActivities = activities.filter(activity => activity.isSpecial);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('AddActivity', { screenTitle: 'Special...' })}
                    title="Add"
                />
            ),
        });
    }, [navigation]);

    return (
        <View>
            <FlatList
                data={specialActivities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.type} - Duration: {item.duration} mins {item.isSpecial ? '(Special)' : ''}</Text>
                )}
            />
        </View>
    )
}

export default SpecialActivities

const styles = StyleSheet.create({})