import { createContext, useState } from "react";

export const UserDataProvider = createContext();


export default function DataProvider({Children}){
    const [userData,setUserData] = useState({
        email:null,
        uid:null
    });
    return (
        <UserDataProvider.Provider value={{userData,setUserData}}>
            {Children}
        </UserDataProvider.Provider>
    )
}



