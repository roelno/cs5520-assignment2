import React, { useState, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import Start from './screens/Start';
import AllActivities from './screens/AllActivities';
import SpecialActivities from './screens/SpecialActivities';
import { ActivityProvider } from './components/ActivityContent';
import colors from './constants/Colors';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticationHandler = (validation) => {
        setIsAuthenticated(validation);
    }

    const screenOptions = (iconName) => ({
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name={iconName} size={size} color={focused ? colors.primary : 'gray'} />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
    });

    const Main = () => (
        <Tab.Navigator>
            <Tab.Screen 
                name="All Activities" 
                component={AllActivities}
                options={screenOptions('running')}
            />
            <Tab.Screen 
                name="Special Activities" 
                component={SpecialActivities} 
                options={screenOptions('tired')}
            />
        </Tab.Navigator>
    );
    
    return (
        <ActivityProvider>
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
        </ActivityProvider>
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