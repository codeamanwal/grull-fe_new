import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Browsefreelancer.css';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const PaymentByClient=()=>{
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
  
    const ClickBrowseFreelancer = () => {
      navigate('/browsefreelancer');
    }
  
    const ClickPostJobs=()=>{
      navigate('/postjob');
    }
  
    const handleImage2Click = () => {
  
    }
    const handleImage3Click = () => {
  
    }

   return (
     <div>

         {/* div 1 for header */}
      <div className='headerStyle' style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginLeft: '80px', marginTop: '16px' }}>Grull</h2>

        <div className='buttonContainer'>
          <button className='browse-jobs' onClick={ClickBrowseFreelancer}>Browse Freelancer &#9660;</button>
        </div>

        <div className='buttonContainer'>
          <button className='manage-jobs' onClick={ClickPostJobs}>Post Jobs &#9660;</button>
          <span className='buttonIcon'></span>
        </div>

        <div className='searchContainer'>
          <input
            type='text'
            placeholder='Search for Jobs, Projects or company'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-container'
          />

          {/* <button className='searchButton' onClick={() => handleSearch(searchQuery)}>
                    Search
                </button> */}
        </div>
        <div className='imageContainer' style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
          <img src={require('../assets/FreelancerProfileHeaderNotif.jpg')} alt="" className='notification' onClick={handleImage2Click} />
          <img src={require('../assets/FreelancerProfileHeaderProfile.jpg')} alt="" className='profile' onClick={handleImage3Click} />
        </div>
      </div>

      {/* div 2 for left and right box */}
      <div className="left-and-right-box" style={{marginTop:'30px'}}>
        

      </div>

     </div>
   )
}

export default PaymentByClient;