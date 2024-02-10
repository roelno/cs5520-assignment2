import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'

const AddActivity = ({ navigation, route }) => {

    useEffect(() => {
        const previousScreenTitle = route.params?.screenTitle || 'Activities';
        navigation.setOptions({
            title: `Add An Activity`,
            headerBackTitle: previousScreenTitle,  // Used in iOS to set the back button title
        });
    }, [navigation, route.params?.screenTitle]);


    return (
        <View>
        <Text>Add an Activity</Text>
        </View>
    )
}

export default AddActivity

const styles = StyleSheet.create({})