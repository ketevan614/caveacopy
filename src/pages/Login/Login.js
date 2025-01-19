import './login.css';
import coverImage from './cover-login.jpg'; // Adjust path based on where the image is in the `src` folder
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
const Login = () => {
    const [user, setUser] = useState(
        {username: '',
        password: ''});
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const foundUser = users.find(
            (u) => u.username === user.username && u.password === user.password
        );

        if (foundUser) {
            foundUser.login = true;
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/');
        }else{
            setError(true);
        }
    }
    console.log(users)

    return (

        <div className="login-container">
            <img src={coverImage} alt="login-cover" />
            <div className='blurred'></div>
            <div className='form-container'>
                <p>Log Into Your Account</p>
                <form action='/submit' method='POST' onSubmit={handleSubmit}>
                    <div>
                        <label >USERNAME</label>
                        <input type='text' id="username" name="username" onChange={handleChange}required></input>
                    </div>
                    <div>
                        <label>PASSWORD</label>
                        <input type='password' id='password' name='password' onChange={handleChange} required></input>
                    </div>
                    {error && (<label>Incorrect User Password Or UserName</label>)}
                    <button type = 'submit'>Log In</button>
                </form>

            </div>
            <Link to='/register' className='new-button'>Create New Account</Link>
            <Link to='/' className='homepage'>
                Go Back To Homepage
            </Link>

        </div>

    );
};

export default Login;
