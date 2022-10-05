import { matchRoutes, useLocation } from "react-router-dom"



 const useCurrentPath = () => {
  const {pathname} = useLocation()


    if(pathname.includes("profile")){
        return "profile"
    }
    if(pathname.includes("past-history")){
        return "past-history"
    }


  return "record"
}

export default useCurrentPath