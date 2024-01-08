import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StartPageHeader.css';

const Start = () => {
  const navigate = useNavigate();

  const handleLoginClick1 = () => {
    navigate('/login');
  };

  const handleLoginClick2 = () => {
    navigate('/signup');
  };

  const handleBox1Click=()=>{
    navigate('/signup');
  }

  const handleBox2Click=()=>{
    navigate('/signup');
  }

  return (
    <div>
      <div className='headerStyle'>
        <h2 style={{marginLeft:'80px', marginTop: '10px'}}>Grull</h2>
      </div>
      <div>
        <h2 className='one'>Join Grull as a Freelancer or Client</h2>
      </div>

      <div className='buttons-container'>
      <button className='buttons' onClick={handleBox1Click}>
    <strong style={{fontSize: '20px', fontStyle: 'urbanist'}}>I'm an independent</strong> <br /> Find work and manage your freelance business
</button>
        <button className='buttons' onClick={handleBox2Click}> <strong  style={{fontSize: '20px', fontStyle: 'urbanist'}}>I'm hiring</strong> <br /> Post opportunities and hire for a project</button>
      </div>

      <div className='two'>
        <h5 style={{fontWeight:'normal'}}>
          Already have an account?{' '}
          <a href="" style={{ color: '#b27ee3', textDecoration: 'none' }} onClick={handleLoginClick1}>
            Log In
          </a>
        </h5>
        <button onClick={handleLoginClick2}> Create Account</button>
      </div>
      
    </div>
  );
};

export default Start;
