import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname:'',
        lastname:'',
        username: '',
        email:'',
        password:'',
        password_again:'',

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register/`, formData);
            console.log('Registration successful: ', response.data)
            navigate('/login')
        }
        catch (error) {
            console.log('Registratuion failed: ', error.message);
        }
    };

    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <p>Register To Start Trading</p>
            <input type='text' name='firstname' placeholder='Firstname' onChange={handleChange} /><br/>
            <input type='text' name='lastname' placeholder='Lastname' onChange={handleChange} /><br/>
            <input type='text' name='username' placeholder='Username' onChange={handleChange} /><br/>
            <input type='text' name='email' placeholder='Email' onChange={handleChange} /><br/>
            <input type='password' name='password' placeholder='Password' onChange={handleChange} /><br/>
            <input type='password' name='password_again' placeholder='Password Again' onChange={handleChange} /><br/>
            <button type='submit'>Register</button><br/>
            <p>Already have an account? <Link className='login-link' to='/login'>login</Link> </p>
            <p>Go <Link className='login-link' to='/'>home</Link> </p>

        </form>
    )
}
export default Register;