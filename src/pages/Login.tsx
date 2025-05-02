import React , { useState} from "react";
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../Components/common/ErrorMessage';
import { useAuth } from "../contexts/AuthContext";
import './Login.css';


const Login:React.FC = () => {
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async(e: React.FormEvent)  => {
        e.preventDefault();
        try {
            await login(username , password);
            navigate('/')
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="login-username">
                    <label htmlFor="username" className="login-usernamess">Username</label>
                    <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    required />
                </div>

                <div className="login-username">
                    <label htmlFor="passowrd" className="login-usernamess">Passowrd</label>
                    <input
                    id="passowrd"
                    type="passowrd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required />
                </div>

                <button
                type="submit"
                className="login-button" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );

};

export default Login;