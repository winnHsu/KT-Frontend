import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextButton from '../../components/buttons/TextButton';

function NewPasswordPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [stage, setStage] = useState(1);
    const navigate = useNavigate();

    const handleSendEmail = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/password_reset/', {
                email
            });
            setStage(2); // Move to enter code stage
            alert('Please check your email for the password reset code.');
        } catch (error) {
            console.error('Failed to send reset email:', error);
            alert('Failed to send reset email. Please try again.');
        }
    };

    const handleVerifyCodeAndResetPassword = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            // Verify the reset code and reset the password in one step
            await axios.post('http://127.0.0.1:8000/api/reset_password/', {
                email,
                code: resetCode,
                new_password: password
            });
            setStage(3); // Move to reset confirmation stage
            alert('Your password has been reset successfully.');
        } catch (error) {
            console.error('Failed to reset password:', error);
            alert('Failed to reset password. Please check the reset code and try again.');
        }
    };

    return (
        <div>
            {stage === 1 && (
                <div>
                    <h2>Reset your password</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button onClick={handleSendEmail}>Send Reset Email</button>
                    <TextButton text='Cnacel' backgroundColor='#4CAF50' color='#FFFFFF' onClick={() => navigate('/login')} />
                </div>
            )}

            {stage === 2 && (
                <div>
                    <h2>Enter Reset Code and New Password</h2>
                    <input
                        type="text"
                        placeholder="Enter Reset Code"
                        value={resetCode}
                        onChange={e => setResetCode(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handleVerifyCodeAndResetPassword}>Reset Password</button>
                    <TextButton text='Cancel' backgroundColor='#4CAF50' color='#FFFFFF' onClick={() => navigate('/login')} />
                </div>
            )}

            {stage === 3 && (
                <div>
                    <h2>Password Reset Successful</h2>
                    <p>Your password has been reset successfully. You can now use your new password to log in.</p>
                    <TextButton text='Confirm' backgroundColor='#4CAF50' color='#FFFFFF' onClick={() => navigate('/login')} />
                </div>
            )}
        </div>
    );
}

export default NewPasswordPage;
