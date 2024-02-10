import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Start from './screens/Start';
import AllActivities from './screens/AllActivities';
import SpecialActivities from './screens/SpecialActivities';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticationHandler = (validation) => {
        setIsAuthenticated(validation);
    }


    const Main = () => (
        <Tab.Navigator>
            <Tab.Screen name="All Activities" component={AllActivities} />
            <Tab.Screen name="Special Activities" component={SpecialActivities} />
        </Tab.Navigator>
    );

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                    <Stack.Screen 
                        name="Main" 
                        component={Main} 
                        options={{headerShown: false}}/>
                ) : (
                    <Stack.Screen 
                        name="Start" 
                        component={Start} 
                        initialParams={{ authenticationHandler: authenticationHandler }}
                        options={{ headerShown: false }}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});