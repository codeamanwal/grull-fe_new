import React from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import Select from 'react-select';

const SignUp = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleCreateAccountClick = async () => {
        const firstName = document.querySelector('[name="First_name"]').value;
        const lastName = document.querySelector('[name="Last_name"]').value;
        const email = document.querySelector('[name="email"]').value;
        const mobileNumber = document.querySelector('[name="MobileNumber"]').value;
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

        const registrationData = {
            email: email,
            password: password,
            // Include other relevant form fields in the registrationData object
        };

        try {
            const response = await fetch('http://35.154.4.80/api/v0/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.status === 201) {
                // User registered successfully, navigate to the profile section
                navigate('/freelancerprofile');
            } else if (response.status === 400) {
                // User already exists, show alert
                alert('REGISTER USER ALREADY EXISTS');
            } else {
                // Handle other status codes as needed
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error during registration:', error);
        }
    };

    const countryOptions = [
        { value: 'India', label: 'India' },
        { value: 'USA', label: 'USA' },
        { value: 'Canada', label: 'Canada' },
    ];

    return (
        <div>
            <div className='headerStyle'>
                <h2 style={{ marginLeft: '80px', marginTop: '10px' }}>Grull</h2>
            </div>
            <div className='outer-most'>
                <div className='content'>
                    <h2>Complete Your Grull profile</h2>
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
                            <Form.Control className='form-vals-two' type="email" name='email' placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formBasicMobile">
                            <Form.Control className='form-vals-two' type="text" name="MobileNumber" placeholder="Mobile Number"
                                pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
                                title="Please enter a 10-digit mobile number" required />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formBasicPassword">
                            <Form.Control className='form-vals-two' type="password" name='password' placeholder="Password (8 or more Characters)" />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formBasicCountry">
                            <Select
                                options={countryOptions} placeholder="Select Country"
                                styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '510px', height: '2px' }) }}
                            />
                        </Form.Group>
                    </Form>

                    <div>
                        <div style={{ display: 'flex', marginTop: '12px', marginBottom: '10px' }}>
                            <input type="checkbox" style={{ marginRight: '10px' }} />
                            <span style={{ fontSize: '13px' }}>Send me helpful emails to find regarding work and job leads.</span>
                        </div>

                        <div style={{ display: 'flex', marginTop: '5px' }}>
                            <input type="checkbox" style={{ marginRight: '10px' }} />
                            <p style={{ fontSize: '13px', margin: '0' }}>Yes, I understand and agree to the Grull Terms of Service, including the User Agreement</p>
                        </div>

                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            <p style={{ fontSize: '13px', margin: '0', marginLeft: '24px' }}>and Privacy Policy.</p>
                        </div>
                    </div>

                    <button className='create-account-button' onClick={handleCreateAccountClick}>Create my account</button>
                    <h5 style={{ fontWeight: 'normal' }}>
                        Already have an account?{' '}
                        <a href="" style={{ color: '#b27ee3', textDecoration: 'none' }} onClick={handleLoginClick}>
                            Log In
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

export default SignUp;
