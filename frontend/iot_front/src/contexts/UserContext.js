// UserContext.js

import { createContext, useContext, useState } from "react";

const UserContext = createContext(); 

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Initialize user state
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}  {/* Wrap the children so they have access to the context */}
        </UserContext.Provider>
    );
};

// Custom hook to access the UserContext
export const UserState = () => {
    const context = useContext(UserContext);  
    if (!context) {
        throw new Error("UserState must be used within a UserProvider");
    }
    return context;  
};

export default UserProvider;
