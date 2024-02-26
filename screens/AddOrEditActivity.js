import { StyleSheet, Text, View, TextInput, Alert, Pressable} from 'react-native'
import React, {useEffect, useState, useLayoutEffect} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../constants/Colors';
import PressableButton from '../components/PressableComponent';
import { useActivities } from '../components/ActivityContent'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';


const AddOrEditActivity = ({ navigation, route }) => {
    // States for activity fields
    const [activityType, setActivityType] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(new Date() );
    const [isSpecial, setIsSpecial] = useState(false);
    const [activityId, setActivityId] = useState(null);

    useEffect(() => {
        const activity = route.params?.activity; // Get the activity from route params
        const previousScreenTitle = 'Back';

        if (activity) {
            // If there's an activity object, then we are editing
            setActivityType(activity.type);
            setDuration(activity.duration.toString());
            setDate(new Date(activity.date));
            setIsSpecial(activity.isSpecial);
            setActivityId(activity.id); // Set the activityId for further operations
            navigation.setOptions({ title: 'Edit Activity', headerBackTitle: previousScreenTitle }); // Set the screen title to 'Edit'
        } else {
            // If no activity object, then we are adding a new one
            navigation.setOptions({ title: 'Add an Activity', headerBackTitle: previousScreenTitle }); // Set the screen title to 'Add'
        }
    }, [route.params, navigation]);


    // State for DropDownPicker and DateTimePicker visibility
    const [open, setOpen] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    // Access the activity context
    const { addActivity, updateActivity, deleteActivity } = useActivities();


    // Handler for confirming add/edit
    const handleConfirm = async () => {
        const isValid = validateActivity();
        if (!isValid) {
            Alert.alert("Invalid Input", "Please ensure all fields are filled correctly");
            return;
        } 

        let updatedIsSpecial = isSpecial;
        if (activityId && isSpecial) {
            updatedIsSpecial = !isChecked;
        }

        const activityData = {
            type: activityType,
            duration: parseFloat(duration),
            date: date.toISOString(),
            isSpecial: updatedIsSpecial,
        };

        try {
            if (activityId) {
                Alert.alert(
                    "Confirm Update",
                    "Are you sure you want to update this activity?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => {
                            updateActivity({ ...activityData, id: activityId });
                            navigation.goBack();
                        }}
                    ]
                );
                
            } else {
                addActivity(activityData);
                navigation.goBack();
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "There was a problem saving the activity.");
        }
    };

    const handleDeletePress = async () => {
        if (activityId) {
            Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this activity?",
                [
                    { text: "Cancel" },
                    {
                        text: "Yes", onPress: () => {
                            deleteActivity(activityId);
                            navigation.goBack();
                        }
                    },
                ]
            );
        }
    };


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
        return true;
    }

    // Add a trash icon to the navigation bar for deleting the activity
    useLayoutEffect(() => {
        if (activityId) {
            navigation.setOptions({
                headerRight: () => (
                    <PressableButton
                        onPress={ handleDeletePress }
                        isEnabled={true}
                        styleOverride={{ marginRight: 10, backgroundColor: colors.primary, borderRadius: 5, elevation: 0, marginTop: 0 }}
                    >
                        <MaterialCommunityIcons name="delete" size={24} color="white" />
                    </PressableButton>
                ),
            });
        }
        else {
            navigation.setOptions({ headerRight: () => null }); // No icon when adding a new activity
        }
    }, [navigation, handleDeletePress, activityId]);

    const [isChecked, setChecked] = useState(false);


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
            
            { isSpecial && (
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={(newValue) => setChecked(newValue)}
                        color={isSpecial ? colors.primary : undefined}
                    />
                    <Text style={styles.checkboxLabel}>This item is marked as special. Select the checkbox if you want to unspecial it.</Text>
                </View>
                )
            }

            <View style={styles.buttonContainer}>
                <PressableButton
                    title='Cancel'
                    onPress={() => navigation.goBack()}
                    isEnabled={true}
                    styleOverride={{ width: 100, alignItems: 'center'}}
                />
                <PressableButton
                    title='Save'
                    onPress={() => {
                            handleConfirm();
                    }}
                    isEnabled={true}
                    styleOverride={{ width: 100, alignItems: 'center'}}
                />
            </View> 
            


        </View>

        
    )
}

export default AddOrEditActivity

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
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    },
    
})