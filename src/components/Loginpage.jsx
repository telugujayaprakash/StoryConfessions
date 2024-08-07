import React from 'react';
import { useAuth } from '../context/DataContextProvider';
import './Components.css';
import { useNavigate } from "react-router-dom";
import g from '../assets/search.png';

const Login = () => {
    const { loginWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="login-page bg-gray-900 body-font">
            
            {currentUser ? (
                     navigate("/")
            ) : (
                <><h2>Login</h2>
            <button onClick={loginWithGoogle} className='flex'><img src={g} alt=""/> Login with Google</button>
            </>
            )}
        </div>
    );
};

export default Login;
