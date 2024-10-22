import { useContext } from "react";
import { AuthContext } from "../auth/Context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    // pegar token
    const { token } = useContext(AuthContext)

    //verificar se é null
    if(token === null) {
        return <Navigate to="/login" />
    }

    
    return token ? <Outlet />: <Navigate to= "/login" />
}

export default PrivateRoute;