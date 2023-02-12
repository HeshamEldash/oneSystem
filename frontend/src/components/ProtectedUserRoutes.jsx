import {Routes,Route,Link,Navigate,Outlet,} from 'react-router-dom';
import { useContext } from "react";
import AuthContext from '../context/AuthContext';
  
const ProtectedUserRoutes = ({  children, redirectPath = '/login' }) => {
const {user , isLoggingOut }= useContext(AuthContext)

if (!user) {
    if (isLoggingOut){
        return 
    }
    return <Navigate to={redirectPath} replace />;
}

return children ? children : <Outlet />;
};

export default ProtectedUserRoutes

