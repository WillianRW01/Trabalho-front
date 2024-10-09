import { Children, useEffect } from "react"
import { jwtDecode } from 'jwt-decode'

const isValidToken = (token) => {
    try {
        const decode = jwtDecode(token);
        const currentTime = Data.now() / 1000
        return decode.exp > currentTime
    } catch (error) {
        return false
    }
}
const getRole = (token) => {
    try {
        const decode = jwtDecode(token);
        console.log('jwtDecode', decode)
        return decode.permissao
    } catch (error) {
        return false
    }
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [role, setRole] = useState(null)

    const login = (newToken) => {
        setToken(newToken)
        setRole(getRole(newToken))
        setRole('') //função para pegar a role do token
        localStorage.setItem('token', newToken)
    }
    const logout = () => {
        setToken(null)
        setRole(null) //função para pegar a role do token
        localStorage.setItem('token')
    }

    useEffect(() => {
        //vlaidar o token
        const storage = localStorage.getItem('token')
        if(storage && isValidToken(storage)){
            setToken(storage);
            setRole(getRole(storage));
        }
    }, [])

    return (
        <>
            <AuthContext.Provider value={{ token, login, logout, role }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}