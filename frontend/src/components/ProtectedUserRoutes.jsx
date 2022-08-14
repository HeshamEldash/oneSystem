import {Routes,Route,Link,Navigate,Outlet,} from 'react-router-dom';
import { useContext } from "react";
import AuthContext from '../context/AuthContext';
  
const ProtectedUserRoutes = ({  children, redirectPath = '/login' }) => {
const {user}= useContext(AuthContext)

if (!user) {
    return <Navigate to={redirectPath} replace />;
}

return children ? children : <Outlet />;
};

export default ProtectedUserRoutes

