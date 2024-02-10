import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useActivities } from '../components/ActivityContent'

const SpecialActivities = () => {
    const { activities } = useActivities();
    const specialActivities = activities.filter(activity => activity.isSpecial);

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