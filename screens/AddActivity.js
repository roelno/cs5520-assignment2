import { StyleSheet, Text, View, TextInput, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../constants/Colors';
import PressableButton from '../components/PressableComponent';
import { useActivities } from '../components/ActivityContent'

const AddActivity = ({ navigation, route }) => {
    const [activityType, setActivityType] = useState(null);
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(null);

    // State for DropDownPicker and DateTimePicker visibility
    const [open, setOpen] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    // Access addActivity function from the context
    const {addActivity} = useActivities();

    // // Set the navigation options
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

    // Validate the activity data
    const validateActivity = () => {
        const durationNumber = parseFloat(duration);

        if (!activityType || !duration || !date) {
            return false;
        }

        if (isNaN(duration)) {
            return false;
        }
    
        if (duration <= 0) {
            return false;
        }

        const newActivity = {
            id: Math.random().toString(),
            type: activityType,
            duration: durationNumber,
            date: date.toISOString(), // Store date as ISO string format
        };
        addActivity(newActivity);
        return true;
    }



    return (
        <View style={styles.container}>

            <Text style={styles.hint}>Activity *</Text>
            <View style={{marginTop:5, marginBottom: 20, zIndex: 5000}}>   
                {/* zIndex is used to ensure the dropdown is displayed on top of other components */}
            
            <DropDownPicker
                open={open}
                value={activityType}
                items={[
                    {label: 'Walking', value: 'Walking'},
                    {label: 'Running', value: 'Running'},
                    {label: 'Swimming', value: 'Swimming'},
                    {label: 'Weights', value: 'Weights'},
                    {label: 'Yoga', value: 'Yoga'},
                    {label: 'Cycling', value: 'Cycling'},
                    {label: 'Hiking', value: 'Hiking'},
                ]}
                setOpen={setOpen}
                setValue={setActivityType}
                placeholder="Select an activity"
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
            </View>

            <Text style={styles.hint}>Duration (min) *</Text>
            <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                placeholder="Enter duration in minutes"
                keyboardType="numeric"
            />

            <Text style={styles.hint}>Date *</Text>
            <TextInput
                style={styles.input}
                placeholder="Select Date"
                value={date ? date.toDateString() : ''}
                onPressIn={ () => {
                    if (!date) {
                        setDate(new Date()); // Set date to current date if it's null
                    };
                    setDatePickerVisibility(prevState => !prevState) } // Show the date picker when the input is focused
                }
                showSoftInputOnFocus={false} // Prevent keyboard from showing
            />
            {isDatePickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    mode="date"
                    display='inline' // Inline for both Android and iOS
                    onChange={onDateChange}
                />
            )}

            <View style={styles.buttonContainer}>
                <PressableButton
                    title='Cancel'
                    onPress={() => navigation.goBack()}
                    isEnabled={true}
                />
                <PressableButton
                    title='Confirm'
                    onPress={() => {
                        const isValid = validateActivity();
                        if (!isValid) {
                            Alert.alert(
                                "Invalid Input", // Title
                                "Please ensure all fields are filled correctly", // Message
                                [
                                    { text: "OK" } // Array of buttons
                                ]
                            );
                        } else {
                            navigation.goBack();
                        }
                    }}
                    isEnabled={true}
                />
            </View> 

        </View>
    )
}

export default AddActivity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    hint: {
        marginTop: 20,
        fontSize: 18,
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
    },
    buttonContainer: { 
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
      },
})