import React, { useContext, useState, useEffect } from 'react';
import { registerAPI, loginAPI } from '../greatergradesapi/Auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../functions/UserContext";
import { useGetAllInstitutions } from '../greatergradesapi/Institutions';

function Register() {
    const { login } = useContext(UserContext);
    const institutions = useGetAllInstitutions();
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        role: '',
        institutionId: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (institutions.length > 0) {
            setIsLoading(false);
        }
    }, [institutions]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.institutionId) {
            setError('Please select an institution');
            return;
        }
        try {
            const user = await registerAPI(
                formData.username,
                formData.password,
                formData.firstName,
                formData.lastName,
                Number(formData.role),
                Number(formData.institutionId)
            );
            if (user) {
                const token = await loginAPI(formData.username, formData.password)
                console.log(token)
                if (token) {
                    login(token, user);
                    navigate('/dashboard');
                }
            } else {
                setError('Registration failed. Please try again.');
                throw new Error(error)
            }
        } catch (err) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Register for Greater Grades</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a role</option>
                            <option value={0}>Student</option>
                            <option value={1}>Teacher</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="institutionId">Institution*</label>
                        <select
                            id="institutionId"
                            name="institutionId"
                            value={formData.institutionId}
                            onChange={handleChange}
                            required
                        >
                            {isLoading ? (
                                <option value="">Loading institutions...</option>
                            ) : (
                                <>
                                    <option value="">Select an institution</option>
                                    {institutions.map(institution => (
                                        <option 
                                            key={institution.institutionId} 
                                            value={institution.institutionId}
                                        >
                                            {institution.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-button">Register</button>
                </form>
                <div className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                </div>
            </div>
        </div>
    );
}

export default Register; 