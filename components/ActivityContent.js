import React, { createContext, useState, useEffect } from 'react';
import {db} from "../firebase/firebaseConfig.js";
import { collection, addDoc, updateDoc, doc, onSnapshot, query } from "firebase/firestore";
import { addDocument, subscribeToCollection } from "../firebase/databaseService.js";


// Create the context
const ActivityContext = createContext();

// Provider component
export const ActivityProvider = ({ children }) => {
    const [activities, setActivities] = useState([
        // { id: 1, type: 'Running', duration: 75, isSpecial: true },
    ]);

    useEffect(() => {
        // Subscribe to Firestore collection for real-time updates
        const unsubscribe = subscribeToCollection("activities", (newActivities) => {
            setActivities(newActivities);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);


    // Function to add an activity with logic to determine if it is special
    const addActivity = (activity) => {
        const duration = parseFloat(activity.duration); 
        const isSpecial = (activity.type === 'Running' || activity.type === 'Weights') && duration > 60.0;
        const newActivityData = { ...activity, duration, isSpecial };
        addDocument("activities", newActivityData);
    };

    return (
        <ActivityContext.Provider value={{ activities, addActivity }}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivities = () => React.useContext(ActivityContext);