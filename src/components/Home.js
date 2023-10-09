import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../context/AuthContext";



const Home = () => {

    let {user, logoutUser} = useContext(AuthContext)

    return(
        <React.Fragment>
        
        {user ? (
            <div className="home-div" >
            <h4>Welcome to FT Trading</h4>
            <p>Visit Your Dashboard To View Your Trades</p>
            <button> <Link className='login-link' to='/dashboard'>Dashboard</Link></button>
        </div>
        ):(
         <div className="home-div" >
         <h4>Welcome to FT Trading</h4>
         <p>Login or Register to get started</p>
         <button> <Link className='login-link' to='/register'>Register</Link></button><button> <Link className='login-link' to='/login'>Login</Link></button>
     </div>
        )}
        </React.Fragment>
    )
}
export default Home;