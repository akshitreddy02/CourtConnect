import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setusername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3008/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log('Data:', data);

            const role = data.user.role;
            const clientid = data.user.clientid; // Assuming your server sends back clientId
            const lawyerid = data.user.lawyerid; // Assuming your server sends back lawyerId
            if (role === 'judge') {
                // window.location.href = '/judge';
                navigate('/judge');
            } else if (role === 'lawyer') {
                navigate('/lawyer', { state: { lawyerid } });
            } else if (role === 'client') {
                navigate('/client', { state: { clientid, lawyerid } });
            }
            else {
                // Handle other roles or scenarios
                console.error('Unknown role:', data.role);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <div>
                <div className="wrapper" id="hello">
                    <div className="title">
                        <span>Login Form</span>
                    </div>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="row">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="username"
                                required
                                value={username}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="row">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="current-password"
                            />
                        </div>
                        <div id="pass">
                            <a href="#" id="a">
                                Forgot password?
                            </a>
                        </div>
                        <div className="row button">
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login