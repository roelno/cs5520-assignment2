import React, { useState, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Start from './screens/Start';
import AllActivities from './screens/AllActivities';
import SpecialActivities from './screens/SpecialActivities';
import AddActivity from './screens/AddActivity';
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
        tabBarLabelStyle: { fontSize: 13, marginTop: 1, marginBottom: 5},
        tabBarIcon: ({ focused, color, size }) => (
            <View style={{ marginBottom: -3 }}>
                <FontAwesome5 name={iconName} size={size} color={focused ? colors.primary : 'gray'} />
            </View>
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        headerTitleStyle: { color: colors.white },
        headerStyle: { backgroundColor: colors.primary},
        tabBarStyle: {
            height: 70,
            paddingTop: 5, 
            paddingBottom: 5, 
        },
    });

    const Activities = () => (
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
                        <>
                            <Stack.Screen 
                                name="Activities" 
                                component={Activities} 
                                options={{headerShown: false}}/>
                            <Stack.Screen
                                name="AddActivity"
                                component={AddActivity}
                                options={({ route }) => ({
                                    title: route.params?.screenTitle || 'Add An Activity',
                                    headerStyle: { backgroundColor: colors.primary },
                                    headerTintColor: colors.white,
                                })}/>
                        </>   
                    ) : (
                        <Stack.Screen 
                            name="Start" 
                            component={Start} 
                            initialParams={{ authenticationHandler: authenticationHandler }}
                            options={{ headerShown: false}}/>
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