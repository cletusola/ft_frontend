import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Login = () => {

    let { loginUser } = useContext(AuthContext)

    return(
        <form className='login-form' onSubmit={loginUser} ><br />
            <p> Login to your account to continue trading</p>
            <input type="text" name="username" placeholder="enter username" required/><br />
            <input type="password" name="password" placeholder="enter password" required /><br />
            <button type="submit">Login</button> <br/>
            <p>Don't have an account? <Link className='login-link' to='/register'>register</Link> </p>
            <p>Go <Link className='login-link' to='/'>home</Link> </p>
        </form>
    )


}

export default Login;