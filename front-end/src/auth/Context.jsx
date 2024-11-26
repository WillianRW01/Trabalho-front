import { createContext, useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'

const isValidToken = (token) => {
    try {
        const decode = jwtDecode(token);
        const currentTime = Date.now() / 1000
        return decode.exp > currentTime
    } catch (error) {
        return false
    }
}
const getRole = (token) => {
    try {
        const decode = jwtDecode(token);
        console.log(decode)
        return decode.role
    } catch (error) {
        return false
    }
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setISLoading] = useState(true)
    const [token, setToken] = useState(null)
    const [role, setRole] = useState(null)

    const login = (newToken) => {
        console.log('logando nesa merda')
        setToken(newToken)
        setRole(getRole(newToken))
        localStorage.setItem('token', newToken)
    }
    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token')
    }

    useEffect(() => {
        //vlaidar o token
        const storage = localStorage.getItem('token')
        console.log(isValidToken(storage))
        if(storage){
            setToken(storage);
            setRole(getRole(storage));
        } else {
            setToken(null);
            setRole(null);
            localStorage.removeItem('token')
        }
        setISLoading(false)
    }, [])

    if(isLoading) {
        return <div>Carregando ...</div>
    }

    return (
        <>
            <AuthContext.Provider value={{ token, login, logout, role }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}