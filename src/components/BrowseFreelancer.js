import React, { useLayoutEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/Browsefreelancer.css';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios, { all } from 'axios';
import Header3 from "./Header3";
import { Box, Button, Divider, Typography } from "@mui/material";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { VscChromeClose } from "react-icons/vsc";
import { LiaFilterSolid } from "react-icons/lia";

import Avatar from '@mui/material/Avatar';

const BrowseFreelancer = () => {
  const navigate = useNavigate();
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const boxRefs = useRef([]);
  const [allFreelancers, setAllFreelancers] = useState([]);

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

  //fetch all freelancers
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    const getFreelancers = async () => {
      try {
        const response = await axios.get('http://35.154.4.80/api/v0/freelancers', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          console.log('Freelancers Fetched successfully',response.data.results);
          
          createrefs(response.data.results);
          setAllFreelancers(response.data.results);          
          // console.log(boxRefs);

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
    updaterefs();
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
  return (
    <div>
      {/* div 1 for header */}
      <Header3 />


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
      <div style={{ marginBottom: '50px', display: 'flex',marginTop:'30px'}} className='browseFreelancers'>
        {/* left box  */}
        <div className='browseFreelancers-left-box'>
        <div className='category' style={{ marginBottom: '40px' }}>
           <Box style={{ cursor: 'pointer',fontSize:'24px',fontWeight:'700',color:'#000',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}} onClick={toggleCategory} >
              Category
              <div>{
              categoryExpanded ? '⮙' : '⮛'
              }</div>
            </Box>

            {categoryExpanded && (
              <div style={{ marginLeft: '10px',marginRight:'10px' }}>
              <div style={{ position: 'relative',marginBottom:'15px',marginTop:'10px'}}>
                <input
                  type="text"
                  placeholder="Search categories"
                  style={{
                   borderRadius: '16px', boxShadow: '0px 0px 4px 0px #00000040',
                    width:'100%',
                    padding:'10px 0px 10px 35px',
                    border:'none',outline:'none'
                  }}
                />
                <FontAwesomeIcon icon={faSearch} style={{
                  position: 'absolute', left: '10px', top: '10px',
                  color: '#00000080',
                }} />
              </div>

                <div style={{ marginBottom: '10px' }}>
                <label style={{color:'#000'}}>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    Graphic Designer
                </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{color:'#000'}}>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    Illustrator
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{color:'#000'}}>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    Programmer
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{color:'#000'}}>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    Video Editor
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{color:'#000'}}>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    3D Artist
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{color:'#000'}}>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    Product Designer
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className='experience-level' style={{ marginBottom: '40px' }}>
            <Box style={{ cursor: 'pointer',fontSize:'24px',fontWeight:'700',color:'#000',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}} onClick={toggleExperience} >
            Experience Level
                <div>{
                experienceExpanded ? '⮙' : '⮛'
                }</div>
              </Box>
            {experienceExpanded && (
              <div style={{ marginLeft: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    Beginner
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    Intermediate
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    Advanced
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                    Expert
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className='job-type' style={{ marginBottom: '40px' }}>
          <Box style={{ cursor: 'pointer',fontSize:'24px',fontWeight:'700',color:'#000',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}} onClick={toggleJob} >
              Job Type
              <div>{
              jobExpanded ? '⮙' : '⮛'
              }</div>
            </Box>
            {jobExpanded && (
              <div>
                <div style={{ marginLeft: '10px', marginBottom: '20px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    Hourly
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px', marginBottom: '10px',marginTop:'10px' }}>
                    <label style={{ marginRight: '10px' }}>
                      <input type="checkbox" />
                    </label>
                    <label style={{ marginRight: '10px' }}>
                      <input type="text" placeholder="$ min" style={{ width: '45px',padding:'0 4px' }} />
                      <span style={{ color: '#808080' }}>/hr</span>
                    </label>
                    <label style={{ marginRight: '10px' }}>
                      <input type="text" placeholder="$ max" style={{ width: '45px',padding:'0 4px' }} />
                      <span style={{ color: '#808080' }}>/hr</span>
                    </label>
                  </div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <label>
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}} />
                    Fixed-Price
                  </label>
                  <div style={{ marginLeft: '30px', marginTop: '15px' }}>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}} />
                        Less than $100
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}  />
                        $100 to $500
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}} />
                        $500 to $1k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}  />
                        $1k to $5k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}  />
                        $5k +
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='location' style={{ marginBottom: '40px' }}>
              <Box style={{ cursor: 'pointer',fontSize:'24px',fontWeight:'700',color:'#000',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'10px'}} onClick={toggleLocation} >
              Location
              <div>{
              locationExpanded ? '⮙' : '⮛'
              }</div>
            </Box>
            {locationExpanded && (
              <div style={{ marginLeft: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    India
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    USA
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    Canada
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    England
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    China
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    Russia
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* right box  */}
        <div className='browseFreelancers-right-box'>
          {allFreelancers?.map((freelancer,indx) => (
            <Box key={indx} >
                <Box sx={{padding:{sm:'30px',xs:'18px 16px'}}}>
                  <Box style={{ display: 'flex',flexDirection:'column'}}>
                    <Box style={{ display: 'flex',flexDirection:'row',gap:'20px'}}>
                      <Avatar variant="square" sx={{textTransform:'uppercase',width:{sm:'200px',xs:'120px'},height:{sm:'200px',xs:'120px'},borderRadius:'16px'}}>
                        {freelancer.full_name[0]}
                      </Avatar>
                      <Box style={{ display: 'flex',flexDirection:'column',gap:'5px',width:'100%',height:'auto'}} ref={ref => boxRefs.current[indx] = ref} key={indx*indx} >
                          <Box style={{ display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
                               <Box style={{ display: 'flex',flexDirection:'column'}}>
                                   <Typography sx={{fontWeight:'700',fontSize:{sm:'28px',xs:'22px'}}}>{freelancer.full_name}</Typography>
                                   <Typography sx={{fontWeight:'600',fontSize:{sm:'17px',xs:'15px'}}}>{freelancer.role}</Typography>
                                   <Typography sx={{fontWeight:'600',fontSize:{sm:'17px',xs:'15px'}}}>${freelancer.rate_per_hour}/hr</Typography>
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
                              {expandedDescriptions[indx]? 
                                (freelancer?.description.substring(0, 350) + '...'):freelancer?.description}
                              {boxRefs.current[indx] && boxRefs.current[indx].clientHeight > 200 && (
                                <Button onClick={() => toggleExpand(indx)} sx={{padding:'0px',color:'#B27EE3',width:'fit-content'}}>
                                  {!expandedDescriptions[indx] ? 'less' : 'more'}
                                </Button>
                              )}
                            </Typography>
                          </Box>
                      </Box>
                    </Box>
                    <Box sx={{margin:{sm:'15px 0 5px 0',xs:'10px 0 3px 0'}}}>
                      <ul style={{display:'flex',flexWrap:'wrap',gap:'15px'}}>
                        {
                          freelancer.skills.map((skill, index)=><li key={index} style={{fontSize:'16px',padding:"10px 25px",backgroundColor:'#E9E9E9',color:'#000000',borderRadius:'16px',width:'fit-content',fontWeight:'500'}}>{skill}</li>)
                        }
                        
                      </ul>
                    </Box>
                    <Box sx={{marginTop:'5px'}}>
                      <Button sx={{color: 'white',backgroundColor: '#B27EE3',borderRadius: '16px',padding:'6px 40px',fontSize:'16px',':hover':{color: 'white',backgroundColor: '#B27EE3'}}}>Hire</Button>
                    </Box>
                  </Box>
              </Box>
              {indx !== allFreelancers.length - 1 && <Divider />}
            </Box>
          ))}
        </div>
      </div>

    // </div>
  )
}
export default BrowseFreelancer;