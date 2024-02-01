import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
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
        <div className="container-fluid lnaveen" >
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-md-4">
                    <div className="card shadow-lg p-4 rounded-3 border-primary ">
                        <div className="card-header bg-primary text-white text-center">
                            <h3 className="card-title mb-0">Login Form</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLoginSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter your username"
                                        required
                                        value={username}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                        autoComplete="current-password"
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login