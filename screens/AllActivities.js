import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useActivities } from '../components/ActivityContent'

const AllActivities = () => {
    const { activities } = useActivities();
    return (
        <View>
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

const styles = StyleSheet.create({})