import React, { useContext,useState, createContext, useEffect } from 'react'

export const authState = {
    idUser:undefined,
    nombre:undefined,
    token:undefined,
    groupList:[]
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [state, setState] = useState(authState);


    return(
        <AuthContext.Provider value={{
            state,
            setState
        }}>
            { children }
        </AuthContext.Provider>
    )
}