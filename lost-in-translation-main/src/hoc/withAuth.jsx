import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

 //User do now redirect to the login-page when the login-session does not exist in session-storage
const withAuth = Component => props =>{
    const {user} = useUser()

    if(user !== null){
        return <Component {...props}/>
    }
    else{
        return <Navigate to="/" />
    }
}

export default withAuth