import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Login = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = async () => {
        const email = document.querySelector('[name="email"]').value;
        const password = document.querySelector('[name="password"]').value;
    
        // Check if email and password are not empty
        if (email.trim() === '') {
          alert('Email field cannot be empty');
          return;
        }
    
        if (password.trim() === '') {
          alert('Password field cannot be empty');
          return;
        }
    
        const formData = new URLSearchParams();
        formData.append("email",email);
        formData.append("password",password);
    
        try {
          // Perform your API request here using formData
          const response = await fetch('http://35.154.4.80/api/v0/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
          });
    
          const responseData = await response.json();
    
          if (response.ok) {
            // Assuming the backend returns a JSON object with an access_token
            if (responseData.access_token) {
              // Store the access token in localStorage or state for future API requests
              const accessToken = responseData.access_token;
              console.log(accessToken);
    
              // Redirect to '/freelancerprofile' on successful login
              navigate('/freelancerprofile');
            } else {
              // Show an alert for unexpected response format
              alert('Unexpected response from the server');
            }
          } else if (response.status === 400) {
            // Show an alert for incorrect credentials
            alert('Wrong credentials or invalid user');
          } else if (response.status === 422) {
            // Show an alert for validation errors
            const errorData = responseData; // Adjust this based on the actual structure of the error response
            console.error('Validation Error:', errorData);
            // Handle validation errors, display error messages to the user
            // Example: alert(errorData.message);
          } else {
            // Show an alert for unexpected response format
            alert('Unexpected response from the server');
          }
        } catch (error) {
          // Handle any error that occurs during the API request
          console.error('Error during login:', error);
          // You can show an appropriate error message or alert here
        }
      };

    return (
        <div>
            <div className='headerStyle'>
                <h2 style={{ marginLeft: '80px', marginTop: '10px' }}>Grull</h2>
            </div>
            <div className='outer-most'>
                <div className='content'>
                    <h2>Login to Your Grull account</h2>
                    <div>
                        <button className='apple-button button-with-icon'>Continue with Apple</button>
                    </div>
                    <div>
                        <button className='google-button button-with-icon'>Continue with Google</button>
                    </div>


                    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                        <hr className='hr-line' />
                        <h3 style={{ color: '#a3a3a3', fontWeight: 'normal', margin: '0 10px' }}>OR</h3>
                        <hr className='hr-line' />
                    </div>

                    <Form>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Form.Group className='form-group' style={{ flex: '1' }} controlId="formBasicFirstName">
                                <Form.Control className='form-vals' type="text" name='First_name' placeholder="First Name" />
                            </Form.Group>

                            <Form.Group className='form-group' style={{ flex: '1' }} controlId="formBasicLastName">
                                <Form.Control className='form-vals' type="text" name='Last_name' placeholder="Last Name" />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
                            <Form.Control className='form-vals-two' type="email" name='email' placeholder="Email"/>
                        </Form.Group>


                        <Form.Group className="mb-3 form-group" controlId="formBasicPassword">
                            <Form.Control className='form-vals-two' type="password" name='password' placeholder="Password (8 or more Characters)"/>
                        </Form.Group>

                    </Form>

                    <button className='create-account-button' onClick={handleLoginClick}>Log In</button>
                    <h5 style={{ fontWeight: 'normal' }}>
                        New to Grull?{' '}
                        <a href="" style={{ color: '#b27ee3', textDecoration: 'none' }} onClick={handleSignupClick}>
                            Sign Up
                        </a>
                    </h5>
                </div>
                <div className='content2'>
                    <img className='image' src={require("../assets/signupImg.png")} alt="Signup" />
                </div>
            </div>
        </div>
    );
}

export default Login;
