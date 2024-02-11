import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import colors from '../constants/Colors';

const ActivityCard = ({item}) => {
    return (
        <View style={styles.activityContainer}>
            <Text style={styles.activityType}>{item.type}</Text>
            {item.isSpecial 
                ? <Image source={require('../constants/special1.png')} style={{ width: 22, height: 22 }} />
                : <View style={{ width: 22, height: 22 }} />}
            <View style={styles.activityInfo}>
                <Text style={styles.infoText}>{new Date(item.date).toDateString()}</Text>
                </View>
                <View style={styles.activityInfo}>
                <Text style={styles.infoText}>{item.duration + ' min'}</Text>
            </View>
        </View>
    )
}

export default ActivityCard

const styles = StyleSheet.create({
    activityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        marginVertical: 10,
    },
    activityType: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white,
    },
    activityInfo: {
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
    },
    infoText: {
        fontWeight: 'bold',
    },
})