import React, { useLayoutEffect, useRef } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/jobapplications.css';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import Header2 from "./Header2";
import { LiaFilterSolid } from "react-icons/lia";

const JobApplications = () => {

  const navigate = useNavigate();

  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const boxRefs = useRef([]);

  const sortByOptions = [
    { value: 'Newest', label: 'Newest' },
    { value: 'Cheapest', label: 'Cheapest' },
  ]

  const [sort, setSort] = useState(sortByOptions[0]);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const toggleCategory = () => setCategoryExpanded(!categoryExpanded);

  const [experienceExpanded, setExperienceExpanded] = useState(true);
  const toggleExperience = () => setExperienceExpanded(!experienceExpanded);

  const [jobExpanded, setJobExpanded] = useState(true);
  const toggleJob = () => setJobExpanded(!jobExpanded);

  const [locationExpanded, setLocationExpanded] = useState(true);
  const toggleLocation = () => setLocationExpanded(!locationExpanded);
  const [category,setcategory]=useState('freelancers');
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };
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
          // createrefs(response.data.results)
        } else {
          console.error('Error fetching freelancers:', response.data.error);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    getFreelancers();
  }, [accessToken]);

  useLayoutEffect(() => {
    // updaterefs();
  }, [allFreelancers]);
  

  const createrefs = (Freelancers) => {
    // console.log("Freelancers:", Freelancers);
    boxRefs.current = Freelancers.map(() => React.createRef(null));
    // console.log("Refs created:", boxRefs.current);
  };
  

  const updaterefs = () => {
    // console.log("Box refs:", boxRefs.current);
    // console.log("Length of box refs array:", boxRefs.current.length);
    setExpandedDescriptions(allFreelancers.map(()=>{return false;}));
    boxRefs.current.forEach((ref,index) => {
      const boxHeight = ref.clientHeight;
      if (boxHeight > 200) {
        console.log(index);
        toggleExpand(index);
      }
    });
  };

  const toggleExpand = (index) => {
    setExpandedDescriptions(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const handleDislikeClick=()=>{

  }

  const handleLikeClick=()=>{

  }

  const handleHire=()=>{

  }

  return (
    <div>
      <Header2 />
      {/* div 2 for box and browse, search bar */}
      <div className='rectangle'></div>
      <div className='search-bar'>
      <h1 style={{ color: 'white'}}>Browse</h1>
      <div style={{display:'flex',flexDirection:'column'}}>
        <Box sx={{display:'flex',flexDirection:{md:'row',xs:'column'},gap:{md:'20px',xs:'7px'},width:'100%'}}>
        <div style={{ position: 'relative',flex:1 }}>
          <input
            type="text"
            placeholder=" Search for Freelancers"
            style={{
              borderRadius: '16px',
              border: 'none',
              width:'100%',
              padding:'10px 45px',
              fontSize:'16px',
              color:'#00000080'
            }}
          />
          <FontAwesomeIcon icon={faSearch} style={{
            color: '#957474',position:'absolute',
            left:'16px',top:'12px'
          }} />
          </div>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Button style={{
                  backgroundColor: '#B27EE3', color: 'white', border: 'none', borderRadius: '16px',
                  fontSize: '16px',padding:'7px 22px'
              }}>Search</Button>
        <Button style={{
              border: 'none', backgroundColor: 'transparent', color: 'white',
              cursor: 'pointer', fontSize: '16px',outline:'none',float:'right'
            }} sx={{display:{md:'none',xs:'block'}}}>   Show Advanced Options</Button>
              </div>
              </Box>
              <Box sx={{display:{md:'block',xs:'none'}}}>
            <Button style={{
              border: 'none', backgroundColor: 'transparent', color: 'white',
              cursor: 'pointer', fontSize: '16px',outline:'none',float:'right'
            }}>   Show Advanced Options</Button>
          </Box>
        </div>

        <div >
            <Button sx={{color:category==='freelancers'?'#fff':'#FFFFFFB2',borderBottom:category==='freelancers'?'1px solid #fff':'1px solid transparent',outline:'none',background:'transparent',borderRadius:'0',fontSize:'16px'}} onClick={()=>setcategory('freelancers')}>Freelancers</Button >
            <Button sx={{color:category==='projects'?'#fff':'#FFFFFFB2',borderBottom:category==='projects'?'1px solid #fff':'1px solid transparent',outline:'none',background:'transparent',borderRadius:'0',marginLeft:'20px',fontSize:'16px'}} onClick={()=>setcategory('projects')}>Projects</Button >
        </div>
      </div>
      <div className="sortingjobs" style={{marginBottom:'30px',cursor:'pointer'}}>
        <Button endIcon={<LiaFilterSolid />} onClick={toggleDrawer(true)} sx={{boxShadow: '0px 0px 4px 0px #00000040',color:'#000',padding:'7px 20px',borderRadius:'16px'}}>Filters</Button>
        <Form>
          <Form.Group className="form-group" controlId="formSortByOptions">
            <span style={{ marginRight: '5px' }}>Sort by:</span>
            <Select
              placeholder=""
              options={sortByOptions}
              value={sort}
              onChange={(selectedOption) => {
                  setSort(selectedOption); 
                  
              }}
              styles={{
                  control: (provided) => ({
                      ...provided,
                      border: 'none',
                      outline: 'none',
                      borderRadius: '16px',
                  }),
              }}
          />
          </Form.Group>
        </Form>
      </div>


      {/* div 3  */}
      <div style={{ marginBottom: '50px', marginTop: '30px',}} className='browseFreelancer'>

        <div className='browseFreelancer-box'>
          {allFreelancers?.map((freelancer,indx) => (
            <Box key={indx} >
            <Box sx={{padding:{sm:'30px',xs:'18px 16px'}}}>
              <Box style={{ display: 'flex',flexDirection:'column'}}>
                <Box style={{ display: 'flex',flexDirection:'row',gap:'20px'}}>
                  <Avatar variant="square" sx={{textTransform:'uppercase',width:{sm:'200px',xs:'120px'},height:{sm:'200px',xs:'120px'},borderRadius:'16px'}}>
                    {freelancer.employee.full_name[0]}
                  </Avatar>
                  <Box style={{ display: 'flex',flexDirection:'column',gap:'5px',width:'100%',height:'auto'}}  key={indx*indx} >
                      <Box style={{ display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
                           <Box style={{ display: 'flex',flexDirection:'column'}}>
                               <Typography sx={{fontWeight:'700',fontSize:{sm:'28px',xs:'22px'}}}>{freelancer.employee.full_name}</Typography>
                               <Typography sx={{fontWeight:'600',fontSize:{sm:'17px',xs:'15px'}}}>{freelancer.employee.role}</Typography>
                               <Typography sx={{fontWeight:'600',fontSize:{sm:'17px',xs:'15px'}}}>${freelancer.employee.rate_per_hour}/hr</Typography>
                           </Box>
                           <Box style={{ display: 'flex',flexDirection:'row',gap:'10px'}}>
                           <img
                              src={require('../assets/dislikeIcon.png')} 
                              alt="Dislike"
                              style={{ cursor: 'pointer', height:'50px', width:'50px', borderRadius:'50%' }}
                              onClick={() => handleDislikeClick(freelancer.freelancer_id)}  
                            />
                            <img
                              src={require('../assets/likeIcon.png')}  
                              alt="Like"
                              style={{ cursor: 'pointer',height:'50px', width:'50px', borderRadius:'50%' }}
                              onClick={() => handleLikeClick(freelancer.freelancer_id)}  
                            />
                           </Box>
                      </Box>
                      <Box>
                      <Typography sx={{ fontWeight: '500', fontSize: { sm: '17px', xs: '15px' }, color: '#454545' }}>
                          {/* {expandedDescriptions[indx]? 
                            (freelancer?.description.substring(0, 350) + '...'):freelancer?.description}
                          {boxRefs.current[indx] && boxRefs.current[indx].clientHeight > 200 && (
                            <Button onClick={() => toggleExpand(indx)} sx={{padding:'0px',color:'#B27EE3',width:'fit-content'}}>
                              {!expandedDescriptions[indx] ? 'less' : 'more'}
                            </Button>
                          )} */}
                        </Typography>
                      </Box>
                  </Box>
                </Box>
                <Box sx={{margin:{sm:'13px 0 5px 0',xs:'10px 0 3px 0'}}}>
                  <ul style={{display:'flex',flexWrap:'wrap',gap:'15px'}}>
                    {
                      freelancer.employee.skills.map((skill, index)=><li key={index} style={{fontSize:'16px',padding:"10px 25px",backgroundColor:'#E9E9E9',color:'#000000',borderRadius:'16px',width:'fit-content',fontWeight:'500'}}>{skill}</li>)
                    }
                    
                  </ul>
                </Box>
                <Box sx={{marginTop:'15px',display:'flex',gap:'12px'}}>
                  <Button sx={{color: 'white',backgroundColor: '#B27EE3',borderRadius: '16px',padding:'6px 40px',fontSize:'16px',':hover':{color: 'white',backgroundColor: '#B27EE3'}}}>Accept</Button>
                  <Button sx={{color: '#B27EE3',backgroundColor: 'white',borderRadius: '16px',padding:'6px 40px',fontSize:'16px',boxShadow: '0px 0px 4px 0.5px #00000040',':hover':{color: '#B27EE3',backgroundColor: 'white'}}}>Reject</Button>
                </Box>
              </Box>
          </Box>
          {indx !== allFreelancers.length - 1 && <Divider />}
        </Box>
            // <div key={freelancer.id} style={{ marginBottom: '30px', padding: '10px' }}>
            //   <div style={{ marginBottom: '-15px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
            //   <h3>{freelancer.employee.full_name}</h3>
            //     <img
            //       src={require('../assets/dislikeIcon.png')} 
            //       alt="Dislike"
            //       style={{ marginLeft: '350px', cursor: 'pointer', height:'50px', width:'50px', borderRadius:'50%' }}
            //       onClick={() => handleDislikeClick(freelancer.id)}  
            //     />
            //     <img
            //       src={require('../assets/likeIcon.png')}  
            //       alt="Like"
            //       style={{ marginLeft: '5px', cursor: 'pointer',height:'50px', width:'50px', borderRadius:'50%' }}
            //       onClick={() => handleLikeClick(freelancer.id)}  
            //     />
            //   </div>

            //   <div style={{ marginBottom: '5px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
            //     <p>{freelancer.employee.role}</p>
            //     {/* Add any other details you want to display */}
            //   </div>

            //   <div style={{ marginBottom: '5px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
            //     <p>${freelancer.employee.rate_per_hour}/hr</p>
            //     {/* Add any other details you want to display */}
            //   </div>

            //   <div style={{ marginBottom: '18px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
            //     {freelancer.employee.skills.map((skill, index) => (
            //       <div key={index} style={{ backgroundColor: '#E9E9E9', color: 'black', borderRadius: '12px', padding: '5px', marginRight: '5px', height: '25px' }}>
            //         {skill}
            //       </div>
            //     ))}
            //   </div>

            //   <div style={{display:'flex',flexDirection:'row',gap:'30px'}} >
            //     <Button style={{ borderRadius: '10px', backgroundColor: '#B27EE3', height: '35px', width: '120px',color:'#fff' }}>Accept</Button>
            //     <Button style={{ borderRadius: '10px', backgroundColor: 'grey', height: '35px', width: '120px',color:'#000' }}>Reject</Button>
            //     {/* <p style={{ cursor:'pointer',color: 'white', marginLeft: '20px' }} onClick={()=>handleHire(freelancer.id)}>Hire</p> */}
            //   </div>

            //   {/* You can customize the display of other details as needed */}
            //   <hr style={{ color: '#FFFFFF', marginTop: '35px', marginBottom: '-15px' }} />
            // </div>
          ))}
        </div>
      </div>

    </div>
  )
}
export default JobApplications;