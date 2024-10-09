import { AuthContext } from "../auth/Context";

const PrivateRoute = () => {
    // pegar token
    const { token } = useContext(AuthContext)

    //verificar se é null
    if(token === null) {
        return <Navigate to="/login" />
    }

    //redirecionar
    return <Outlet />
}

export default PrivateRoute;