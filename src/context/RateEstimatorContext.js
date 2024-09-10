import React, { useContext, useState } from 'react';

const RateEstimatorContext = React.createContext();

export function useRateEstimatorContext() {
    return useContext(RateEstimatorContext);
}

export function RateEstimatorProvider({children}) {
    const [profileList, setProfileList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [esttaskList, setEstTaskList] = useState([]);

    return (
        <RateEstimatorContext.Provider value={{ profileList, setProfileList, taskList, setTaskList, esttaskList, setEstTaskList }}>
            {children}
        </RateEstimatorContext.Provider>
    );
}

export default RateEstimatorContext;
