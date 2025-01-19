import coverImage from '../Login/cover-login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { useState } from 'react';

const Register = () => {
    // Fetch users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        login:false,
        favourites: []
    });
    const [itsUsed, setItsUsed] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    // Handle form submission
    const HandleSubmit = (e) => {
        e.preventDefault(); 

        // Check for validation errors
        if (itsUsed || passwordMismatch) {
            alert('Fix the errors before submitting.');
            return;
        }

       
        const newUser = {
            fullName: formData.fullName,
            username: formData.username,
            password: formData.password,
            login:false
        };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        navigate('/login');
        

    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        
        if (name === 'username') {
            setItsUsed(users.some((user) => user.username === value));
        }

        
        if (name === 'confirmPassword' || name === 'password') {
            setPasswordMismatch(
                name === 'confirmPassword'
                    ? value !== formData.password
                    : formData.confirmPassword !== value
            );
        }
    };
    console.log(users);

    return (
        <div className="login-container register">
            <img src={coverImage} alt="login-cover" />
            <div className="register-blurred"></div>
            <div className="register-form-container">
                <p>Create New Account</p>
                <form onSubmit={HandleSubmit}>
                    <div>
                        <label>FULL NAME</label>
                        <input
                            type="text"
                            id="full-name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label >USERNAME</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        {itsUsed && (
                            <label className="user-error">Username is already used</label>
                        )}
                    </div>
                    <div>
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <label>CONFIRM PASSWORD</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {passwordMismatch && (
                            <label className="user-error">Passwords do not match</label>
                        )}
                    </div>

                    <button type="submit">Create Account</button>
                </form>
                <Link to="/login" className="login-button">
                    Log In
                </Link>
                <Link to='/' className='homepage'>
                    Go Back To Homepage
                </Link>
            </div>
        </div>
    );
};

export default Register;
