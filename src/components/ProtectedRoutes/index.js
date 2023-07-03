import Cookies from "js-cookie"
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min"



const ProtectedRoutes = (props) => {
    const token = Cookies.get('jwt_token')

    if(token === undefined){
       return <Redirect to  = '/login'/>
    }
   return  <Route {...props}/>
}

export default ProtectedRoutes