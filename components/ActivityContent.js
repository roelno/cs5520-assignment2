import React, { createContext, useState } from 'react';

// Create the context
const ActivityContext = createContext();

// Provider component
export const ActivityProvider = ({ children }) => {
    const [activities, setActivities] = useState([
        { id: 1, type: 'Running', duration: 75, isSpecial: true },
        { id: 2, type: 'Cycling', duration: 30, isSpecial: false },
        { id: 3, type: 'Weights', duration: 45, isSpecial: false },
    ]);

    // Function to add an activity with logic to determine if it is special
    const addActivity = (activity) => {
        const isSpecial = (activity.type === 'Running' || activity.type === 'Weights') && activity.duration > 60;
        const newActivity = { ...activity, isSpecial };
        setActivities((prevActivities) => [...prevActivities, newActivity]);
    };

    return (
        <ActivityContext.Provider value={{ activities, addActivity }}>
            {children}
        </ActivityContext.Provider>
    );
};

// Export the context to be used by other components
export const useActivities = () => React.useContext(ActivityContext);