import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_USER } from "../const/storageKey";
import { storageRead } from "../utils/storage";

//Context -> exposing state
const UserContext = createContext()

// This is a hook that is being used to access the context
export const useUser = () => {
    return useContext(UserContext) // returns the objects user and setUser
}

//Provider -> managing state 
const UserProvider = ({ children }) => {

    const [user, setUser] = useState( storageRead(STORAGE_KEY_USER))

    const state = {
        user,
        setUser
    }

    return (
        // Value is being the state that is going to be exposed.
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider