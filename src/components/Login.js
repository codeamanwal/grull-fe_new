import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Signup.css';
import Button from '@mui/material/Button';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import grullLogo from "../assets/grullLogoPurple.svg"
import { useLocation } from 'react-router-dom';
import BAPI from '../helper/variable';

const Login = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/');
    };

    const handleLoginClick = async () => {
      try {
        const email = document.querySelector('[name="email"]').value;
        const password = document.querySelector('[name="password"]').value;
    
        if (!email.trim() || !password.trim()) {
          alert('Email and password cannot be empty');
          return;
        }
    
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);
    
        const response = await fetch(`${BAPI}/api/v0/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });
    
        if (response.ok) {
          const responseData = await response.json();
    
          if (responseData.access_token) {
            const accessToken = responseData.access_token;
            console.log(accessToken);
            localStorage.setItem('accessToken', accessToken);
            navigate('/loading');
          } else {
            alert('Unexpected response from the server');
          }
        } else if (response.status === 400) {
          alert('Wrong credentials or invalid user');
        } else if (response.status === 422) {
          const errorData = await response.json();
          console.error('Validation Error:', errorData);
        } else {
          alert('Unexpected response from the server');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
    
    return (
      <div>
      <div className='headerStyle'>
          <img src={grullLogo} alt="Grull" className='header-logo'/>
      </div>
      <div>
      <div className='res-content'>
          <h2>Complete Your Grull profile</h2>
      </div>
      <div className='outer-most'>
          <div className='content'>
          <h2>Login to your Grull profile</h2>
              <div>
                  <Button className='apple-button' startIcon={<FaApple style={{fontSize:'23px',}}/>}>Continue with Apple</Button>
              </div>
              <div>
                  <Button className='google-button' startIcon={<FcGoogle style={{backgroundColor:'#fff',borderRadius:'50%',fontSize:'25px'}}/>}>Continue with Google</Button>
              </div>


              <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                  <hr className='hr-line' />
                  <h3 style={{ color: '#a3a3a3', fontWeight: 'normal', margin: '0 10px' }}>OR</h3>
                  <hr className='hr-line' />
              </div>

              <Form>
                  

                  <Form.Group className="mb-3 form-group" controlId="formBasicEmail" style={{display:'flex'}}>
                      <Form.Control className='form-vals-two' type="email" name='email' placeholder="Email" />
                  </Form.Group>

                  <Form.Group className="mb-3 form-group" controlId="formBasicPassword" style={{display:'flex'}}>
                      <Form.Control className='form-vals-two' type="password" name='password' placeholder="Password (8 or more Characters)" />
                  </Form.Group>

              </Form>

              <button className='create-account-button' onClick={handleLoginClick}>Log In</button>
                    <h5 style={{fontWeight:'normal',color: '#656565',fontSize: '16px'}}>
                        New to Grull?{' '}
                        <a style={{ color: '#b27ee3', textDecoration: 'none',fontWeight:'700',cursor:'pointer' }} onClick={handleSignupClick}>
                            Sign Up
                        </a>
                    </h5>
          </div>
          <div className='content2'>
              <img className='image' src={require("../assets/signupImg.png")} alt="Signup" />
          </div>
      </div>
  </div>
</div>
    );
}

export default Login;