import { StyleSheet, Text, View, TextInput, Platform, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../constants/Colors';

const AddActivity = ({ navigation, route }) => {
    const [activityType, setActivityType] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [duration, setDuration] = useState('');

    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    // Set the headerBackTitle
    useEffect(() => {
        const previousScreenTitle = route.params?.screenTitle || 'Activities';
        navigation.setOptions({
            title: `Add An Activity`,
            headerBackTitle: previousScreenTitle,  // Used in iOS to set the back button title
        });
    }, [navigation, route.params?.screenTitle]);


    // Handler for when the date is selected or changed
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDatePickerVisibility(false);  // after pick the date, close it
    };


    return (
        <View style={styles.container}>

            <Text style={styles.hint}>Activity *</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={[
                    {label: 'Walking', value: 'Walking'},
                    {label: 'Running', value: 'running'},
                    {label: 'Swimming', value: 'swimming'},
                    {label: 'Weights', value: 'Weights'},
                    {label: 'Yoga', value: 'Yoga'},
                    {label: 'Cycling', value: 'Cycling'},
                    {label: 'Hiking', value: 'Hiking'},
                ]}
                setOpen={setOpen}
                setValue={setValue}
                
             
                defaultValue={activityType}
                containerStyle={{ height: 40, zIndex: 5000 }} 
                style={{ borderColor: colors.primary}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownContainerStyle={{ borderColor: colors.primary}}
                dropDownMaxHeight={200}
                onChangeItem={item => {
                    setActivityType(item.value);
                    setOpen(false); // Close the picker after selection
                }}
                zIndex={5000} 
                listMode="SCROLLVIEW"
            />

            <Text style={styles.hint}>Duration (min) *</Text>
            <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                placeholder="Enter duration in minutes"
                keyboardType="numeric"
            />

            <Text style={styles.hint}>Date *</Text>
            {/* When the user taps on this TextInput, the date picker will be shown */}
            <TextInput
                style={styles.input}
                placeholder="Select Date"
                value={date.toDateString()}
                onFocus={ () => setDatePickerVisibility(true) } // Show the date picker when the input is focused
                showSoftInputOnFocus={false} // Prevent keyboard from showing
            />
            {isDatePickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display='inline' // Inline for both Android and iOS
                    onChange={onDateChange}
                />
            )}

        </View>
    )
}

export default AddActivity

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 20,
    },
    hint: {
        marginTop: 20,
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        width: '100%',
    },
})