import {createContext, useState} from "react";

export const preferenceContext = createContext(null);

export default function PreferenceContext({children}) {
    const [preferences, setPreferences] = useState({theme: "light"});
    return (
        <preferenceContext.Provider value={{preferences, setPreferences}}>
            {children}
        </preferenceContext.Provider>
    );
}