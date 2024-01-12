import React from "react";
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/Browsefreelancer.css';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { Button } from "@mui/material";

const JobApplications = () => {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const ClickBrowseFreelancer = () => {
    navigate('/browsefreelancer');
  }

  const ClickPostJobs = () => {
    navigate('/postjob');
  }

  const handleImage2Click = () => {

  }
  const handleImage3Click = () => {

  }

  const sortByOptions = [
    { value: 'Newest', label: 'Newest' },
    { value: 'Cheapest', label: 'Cheapest' },
  ]

  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const toggleCategory = () => setCategoryExpanded(!categoryExpanded);

  const [experienceExpanded, setExperienceExpanded] = useState(true);
  const toggleExperience = () => setExperienceExpanded(!experienceExpanded);

  const [jobExpanded, setJobExpanded] = useState(true);
  const toggleJob = () => setJobExpanded(!jobExpanded);

  const [locationExpanded, setLocationExpanded] = useState(true);
  const toggleLocation = () => setLocationExpanded(!locationExpanded);

  //fetch all freelancers
  const [allFreelancers, setAllFreelancers] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const { jobid } = useParams();
  useEffect(() => {
    const getFreelancers = async () => {
      try {
        const response = await axios.get(`http://35.154.4.80/api/v0/jobs/${jobid}/applications?`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
         console.log(response.data.results)
        if (response.status === 200) {
          console.log('Freelancers Fetched successfully');

          // Set all freelancers
          setAllFreelancers(response.data.results);
        } else {
          console.error('Error fetching freelancers:', response.data.error);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    getFreelancers();
  }, [accessToken]);

  const handleDislikeClick=()=>{

  }

  const handleLikeClick=()=>{

  }

  const handleHire=()=>{

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


      {/* div 2 for box and browse, search bar */}
      <div className='rectangle'></div>
      <div className='search-bar'>
        <h1 style={{ color: 'white', marginLeft: '150px', marginTop: '50px' }}>Browse</h1>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder=" Search for Freelancers"
            style={{
              marginRight: '30px', borderRadius: '10px',
              height: '32px', width: '980px', marginLeft: '150px', border: 'none',
              paddingLeft: '40px', // Adjust padding to make space for the image
              fontFamily: 'Font Awesome 5 Free',
            }}
          />
          <FontAwesomeIcon icon={faSearch} style={{
            position: 'absolute', left: '165px', top: '50%',
            transform: 'translateY(-50%)', zIndex: 1, color: '#957474',
          }} />

          <button style={{
            backgroundColor: '#B27EE3', color: 'white', border: 'none', borderRadius: '10px',
            height: '38px', width: '100px', fontSize: '15px'
          }}>Search</button>
        </div>

        <div style={{ marginLeft: '1100px', color: 'white', marginTop: '15px' }}>
          <button style={{
            border: 'none', backgroundColor: '#ED8335', color: 'white',
            cursor: 'pointer', fontSize: '15px'
          }}>   Show Advanced Options</button> </div>

        <div style={{ marginTop: '15px', marginLeft: '150px' }}>
          <a href="" className='freelancer'>Freelancer</a>
          <a href="" className='projects'>Projects</a>
        </div>

      </div>

      <div style={{ marginTop: '50px', marginLeft: '1100px' }}>
        <Form>
          <Form.Group className="mb-3 form-group" controlId="formSortByOptions">
            <span style={{ marginRight: '10px' }}>Sort by:</span>
            <Select
              placeholder=""
              options={sortByOptions}
              styles={{
                control: (provided) => ({
                  ...provided, borderRadius: '10px', width: '200px', height: '2px',
                  border: '1px solid #D9D9D9'
                }),
              }}
            />
          </Form.Group>
        </Form>
      </div>



      {/* div 3  */}
      <div style={{ marginBottom: '50px', marginTop: '10px', display: 'flex' }}>
        {/* left box  */}
        

        {/* right box  */}
        <div className='browseFreelancer-right-box'>
          {allFreelancers.map((freelancer) => (
            <div key={freelancer.id} style={{ marginBottom: '30px', padding: '10px' }}>

              <div style={{ marginBottom: '-15px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
              <h3>{freelancer.employee.full_name}</h3>
                <img
                  src={require('../assets/dislikeIcon.png')} 
                  alt="Dislike"
                  style={{ marginLeft: '350px', cursor: 'pointer', height:'50px', width:'50px', borderRadius:'50%' }}
                  onClick={() => handleDislikeClick(freelancer.id)}  
                />
                <img
                  src={require('../assets/likeIcon.png')}  
                  alt="Like"
                  style={{ marginLeft: '5px', cursor: 'pointer',height:'50px', width:'50px', borderRadius:'50%' }}
                  onClick={() => handleLikeClick(freelancer.id)}  
                />
              </div>

              <div style={{ marginBottom: '5px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                <p>{freelancer.employee.role}</p>
                {/* Add any other details you want to display */}
              </div>

              <div style={{ marginBottom: '5px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                <p>${freelancer.employee.rate_per_hour}/hr</p>
                {/* Add any other details you want to display */}
              </div>

              <div style={{ marginBottom: '18px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                {freelancer.employee.skills.map((skill, index) => (
                  <div key={index} style={{ backgroundColor: '#E9E9E9', color: 'black', borderRadius: '12px', padding: '5px', marginRight: '5px', height: '25px' }}>
                    {skill}
                  </div>
                ))}
              </div>

              <div style={{display:'flex',flexDirection:'row',gap:'30px'}} >
                <Button style={{ borderRadius: '10px', backgroundColor: '#B27EE3', height: '35px', width: '120px',color:'#fff' }}>Accept</Button>
                <Button style={{ borderRadius: '10px', backgroundColor: 'grey', height: '35px', width: '120px',color:'#000' }}>Reject</Button>
                {/* <p style={{ cursor:'pointer',color: 'white', marginLeft: '20px' }} onClick={()=>handleHire(freelancer.id)}>Hire</p> */}
              </div>

              {/* You can customize the display of other details as needed */}
              <hr style={{ color: '#FFFFFF', marginTop: '35px', marginBottom: '-15px' }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
export default JobApplications;