import React , {useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/common/ErrorMessage";
import './Register.css';
import { useAuth } from "../contexts/AuthContext";
import './Register.css';



const Register: React.FC = () => {
    const { register} = useAuth();
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [last_name , setLastName] = useState('');
    const [first_name , setFirstName] = useState('');
    const [email , setEmail] = useState('');
    const [error , setError] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        try {
            await register(username, email, password, first_name, last_name );
            navigate('/')
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', error);
        }
    };


    return (
        <div className="register-container">
            <h1 className="register-title">Create Account</h1>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="register-username">
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
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required />
                </div>



                <div className="login-email">
                    <label htmlFor="email" className="login-email">Email</label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required />
                </div>


                <div className="login-first-name">
                    <label htmlFor="first_name" className="login-usernamess">FirstName</label>
                    <input
                    id="first_name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="login-input"
                    required />
                </div>


                <div className="login-lastName">
                    <label htmlFor="last_name" className="login-usernamess">LastName</label>
                    <input
                    id="last_name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="login-input"
                    required />
                </div>

                <button
                type="submit"
                className="login-button" onClick={handleSubmit}>Register</button>
            </form>
        </div>
    );

};

export default Register;
