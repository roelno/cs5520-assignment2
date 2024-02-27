import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import React from 'react'
import colors from '../constants/Colors';

const ActivityList = ({ navigation, activities, onlySpecial = false }) => {
    const renderActivity = ({ item }) => (
        <Pressable 
            onPress={() => navigation.navigate('AddOrEditActivity', {activity: item }) } 
            style={({ pressed }) => [styles.activityContainer, pressed && styles.pressed]}
            >
                
            <>
                <Text style={styles.activityType}>{item.type}</Text>
                {item.isSpecial && <Image source={require('../constants/special.png')} style={{ width: 22, height: 22 }} />}
                {!item.isSpecial && <View style={{ width: 22, height: 22 }} />}
                <View style={styles.activityInfo}>
                    <Text style={styles.infoText}>{new Date(item.date).toDateString()}</Text>
                </View>
                <View style={styles.activityInfo}>
                    <Text style={styles.infoText}>{item.duration + ' min'}</Text>
                </View>
            </>
        </Pressable>
    );

    const filteredActivities = onlySpecial ? activities.filter(activity => activity.isSpecial) : activities;

    return (
        <FlatList
            data={filteredActivities}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderActivity}
        />
    );
};

export default ActivityList

const styles = StyleSheet.create({
    activityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        marginVertical: 10,
    },
    activityType: {
        flex: 1, // Take up as much space as possible without pushing other items out
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white,
    },
    activityInfo: {
        minWidth: 60, // Set a minimum width for the date and duration
        alignItems: 'center', // Center the text within the activityInfo
        padding: 8,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    infoText: {
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    },
})