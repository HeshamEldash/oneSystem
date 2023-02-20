import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import AuthContext from '../context/AuthContext';

function Home() {
const {user , isLoggingOut }= useContext(AuthContext)
if (!user) {
  if (isLoggingOut){
      return 
  }
  return <Navigate to={'/login'} replace />;
}

return <Navigate to={'/app/staff-dashboard'} replace />;


}

export default Home
