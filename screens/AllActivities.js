import { StyleSheet, Text, View, FlatList,Button } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useActivities } from '../components/ActivityContent'

const AllActivities = ({ navigation }) => {
    const { activities } = useActivities();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('AddActivity')}
                    title="Add"
                />
            ),
        });
    }, [navigation]);

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