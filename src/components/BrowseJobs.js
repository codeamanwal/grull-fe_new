
import { useNavigate} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/Browsejobs.css';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { Box, Button, Divider, Typography } from "@mui/material";
import Header3 from "./Header3";
import { LiaFilterSolid } from "react-icons/lia";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { VscChromeClose } from "react-icons/vsc";
import { BAPI } from '../helper/variable';

const BrowseJobs = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  
  const container = useRef();
  const handleClickOutside = (e) => {
    if (container.current && !container.current.contains(e.target)) {
      // setDropdownState({ open: false });
    }
  };
  // attaches an eventListener to listen when componentDidMount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // optionally returning a func in useEffect runs like componentWillUnmount to cleanup
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const ClickBrowseJobs = () => {
    navigate('/browsejobs');
  }

  const handleImage2Click = () => {

  }
  
  const container2= useRef();
    const [showDropdown, setShowDropdown] = useState(false);
    const clickProfileImage = () => {
        // setShowDropdown(!showDropdown);
        setShowDropdown((prevState) => ({ open: !prevState.open }));
    }
    const handleClickOutside2 = (e) => {
        if (container2.current && !container2.current.contains(e.target)) {
            setShowDropdown({ open: false });
        }
    };
    //attaches an eventListener to listen when componentDidMount
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside2);
        // optionally returning a func in useEffect runs like componentWillUnmount to cleanup
        return () => document.removeEventListener("mousedown", handleClickOutside2);
    }, []);

    const viewProfileClick = () => {
      navigate('/employerprofile');
  }
  const [jobs, setJobs] = useState([]);
  const [contest,setContest]=useState([]);
  useEffect(() => {
    const getJobs = async (page = 1) => {
      try {
        const response = await axios.get(`${BAPI}/api/v0/jobs`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          params: {
            page: page,
            per_page: 8,
          },
        });
  
        if (response.status === 200) {
          setJobs(prevJobs => {
            const newJobs = response.data.results.filter(newJob => !prevJobs.some(existingJob => existingJob.id === newJob.id));
            return [...prevJobs, ...newJobs];
          });
          
          if (response.data.next) {
            // await getJobs(page + 1);
            console.log(jobs);
          }
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
  
    getJobs();
  }, [accessToken]);

  const getTimeDifference = (modifiedAt) => {
    const now = new Date();
    const modifiedDate = new Date(modifiedAt);
    const differenceInMilliseconds = now - modifiedDate;

    const minutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (weeks > 0) {
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const sortByOptions = [
    { value: 'Newest', label: 'Newest' },
    { value: 'Cheapest', label: 'Cheapest' },
  ]

  const [sort, setSort] = useState(sortByOptions[0]);

  const handlesorting =()=>{

  }

  const handleLocationChange = (location) => {
    setSelectedLocations((prevSelected) => {
      if (prevSelected.includes(location)) {
        return prevSelected.filter((loc) => loc !== location);
      } else {
        return [...prevSelected, location];
      }
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const filteredJobs = jobs.filter((job) => {
    if (selectedLocations.length > 0 && !selectedLocations.includes(job.location)) {
      return false;
    }
  
    if (selectedCategories.length > 0 && !selectedCategories.includes(job.category)) {
      return false;
    }
  
    return true;
  });


  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const toggleCategory = () => setCategoryExpanded(!categoryExpanded);

  const [experienceExpanded, setExperienceExpanded] = useState(true);
  const toggleExperience = () => setExperienceExpanded(!experienceExpanded);

  const [jobExpanded, setJobExpanded] = useState(true);
  const toggleJob = () => setJobExpanded(!jobExpanded);

  const [locationExpanded, setLocationExpanded] = useState(true);
  const toggleLocation = () => setLocationExpanded(!locationExpanded);

  const handleApplynow=(job_id)=>{
       navigate(`/jobdetails/${job_id}`)
  }
  const [category,setcategory]=useState('projects')
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
                  placeholder=" Search for Projects"
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
            <Button sx={{color:category==='projects'?'#fff':'#FFFFFFB2',borderBottom:category==='projects'?'1px solid #fff':'1px solid transparent',outline:'none',background:'transparent',borderRadius:'0',fontSize:'16px'}} onClick={()=>setcategory('projects')}>Projects</Button >
            <Button sx={{color:category==='contests'?'#fff':'#FFFFFFB2',borderBottom:category==='contests'?'1px solid #fff':'1px solid transparent',outline:'none',background:'transparent',borderRadius:'0',marginLeft:'20px',fontSize:'16px'}} onClick={()=>setcategory('contests')}>Contest</Button >
        </div>
      </div>

      <div className="sortingjobs" style={{marginBottom:'30px'}}>
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

      <SwipeableDrawer
            anchor='top'
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <Box sx={{minHeight:'100vh',display:'flex',flexDirection:'column',gap:'20px',padding:'20px 30px'}}>
               <Box sx={{textAlign:'end'}}>
               <VscChromeClose style={{fontSize:'35px',cursor:'pointer'}} onClick={toggleDrawer(false)}/>
               </Box>
               <Box >
               <div className='browseJobs-left-box blb'>
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
                    placeholder=" Search categories"
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
                    <input type="checkbox" onChange={() => handleCategoryChange('Graphic_Designer')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Graphic Designer
                </label>


                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('ILLUSTRATOR')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Illustrator
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('PROGRAMMER')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Programmer
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('VIDEO_EDITOR')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Video Editor
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('THREE_D_ARTIST')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    3D Artist
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('PRODUCT_DESIGNER')} style={{marginRight:'7px',cursor:'pointer'}}/>
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
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}}/>
                    Beginner
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}}/>
                    Intermediate
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}}/>
                    Advanced
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}}/>
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
                      <input type="text" placeholder="$ max" style={{ width: '45px',padding:'0 2px' }} />
                      <span style={{ color: '#808080' }}>/hr</span>
                    </label>
                  </div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    Fixed-Price
                  </label>
                  <div style={{ marginLeft: '30px', marginTop: '10px' }}>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                        Less than $100
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                        $100 to $500
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                        $500 to $1k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                        $1k to $5k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
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
                    <input type="checkbox" onChange={() => handleLocationChange('INDIA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    India
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox"  onChange={() => handleLocationChange('USA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    USA
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleLocationChange('CANADA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Canada
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleLocationChange('ENGLAND')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    England
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleLocationChange('CHINA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    China
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleLocationChange('RUSSIA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Russia
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
               </Box>
            </Box>
          </SwipeableDrawer>

      {/* div 3  */}
      <div style={{ marginBottom: '50px', display: 'flex',marginTop:'30px' }} className='browseJobs'>
        {/* left box  */}
        <div className='browseJobs-left-box'>
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
                    placeholder=" Search categories"
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
                    <input type="checkbox" onChange={() => handleCategoryChange('Graphic_Designer')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Graphic Designer
                </label>


                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('ILLUSTRATOR')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Illustrator
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('PROGRAMMER')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Programmer
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('VIDEO_EDITOR')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Video Editor
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('THREE_D_ARTIST')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    3D Artist
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleCategoryChange('PRODUCT_DESIGNER')} style={{marginRight:'7px',cursor:'pointer'}}/>
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
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}}/>
                    Beginner
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}}/>
                    Intermediate
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}}/>
                    Advanced
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox"  style={{marginRight:'7px',cursor:'pointer'}}/>
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
                      <input type="text" placeholder="$ max" style={{ width: '45px',padding:'0 2px' }} />
                      <span style={{ color: '#808080' }}>/hr</span>
                    </label>
                  </div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <label>
                    <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}} />
                    Fixed-Price
                  </label>
                  <div style={{ marginLeft: '30px', marginTop: '10px' }}>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                        Less than $100
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                        $100 to $500
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                        $500 to $1k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
                        $1k to $5k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" style={{marginRight:'7px',cursor:'pointer'}}/>
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
                    <input type="checkbox" onChange={() => handleLocationChange('INDIA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    India
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox"  onChange={() => handleLocationChange('USA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    USA
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleLocationChange('CANADA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Canada
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleLocationChange('ENGLAND')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    England
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleLocationChange('CHINA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    China
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" onChange={() => handleLocationChange('RUSSIA')} style={{marginRight:'7px',cursor:'pointer'}}/>
                    Russia
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='browseJobs-right-box'>
            {
              filteredJobs.map((job,index)=>
              <>
              <Box sx={{padding:{sm:'30px',xs:'18px 16px'}}} key={index}>
               <Box sx={{display:'flex',flexDirection:'column',gap:{sm:'10px',xs:'8px'}}}>
                <Box sx={{display:'flex',flexDirection:'column',gap:{sm:'10px',xs:'7px'}}}>
                  <Typography sx={{fontSize:{sm:'28px',xs:'23px'},fontWeight:'700',letterSpacing:'-1px'}}>{job.title}</Typography>
                  <Box sx={{display:'flex',flexDirection:'row',gap:{sm:'15px',xs:'10px'},alignItems:'center'}}>
                    <Typography sx={{fontSize:{sm:'20px',xs:'17px'},fontWeight:'500',letterSpacing:'-1px'}}>Budget {job.rate_per_hour}</Typography>
                    <Typography sx={{fontSize:{sm:'15px',xs:'13px'},fontWeight:'500',letterSpacing:'-1px',color:'#00000080'}}>Posted {getTimeDifference(job.modified_at)}</Typography>
                  </Box>
                </Box>
                <Typography sx={{color:'#454545',fontSize:{sm:'18px',xs:'16px'}}}>
                    {job.description}
                </Typography>
                <Box sx={{margin:{sm:'15px 0 5px 0',xs:'10px 0 3px 0'}}}>
                  <ul style={{display:'flex',flexWrap:'wrap',gap:'15px'}}>
                    {
                      job.required_skills.map((skill,indx)=><li key={indx} style={{fontSize:'16px',padding:"8px 18px",backgroundColor:'#E9E9E9',color:'#000',borderRadius:'10px',width:'fit-content'}}>{skill}</li>)
                    }
                    
                  </ul>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column',gap:'5px'}}>
                  <Typography sx={{color:'#B27EE3',fontSize:{sm:'15px',xs:'14px'},fontWeight:'500'}}>Non Negotiable</Typography>
                  <Button onClick={()=>{handleApplynow(job.id)}} sx={{padding:'5px 25px',backgroundColor:'#B27EE3',color:'#fff',textTransform:'none',fontSize:{sm:'18px',xs:'16px'},borderRadius:'16px',width:'fit-content',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>
                    Apply Now
                  </Button>
                </Box>
               </Box>
             </Box>
             {index !== jobs.length - 1 && <Divider />}
              </>)
            }
             
        </div>
      </div>

    </div>
  )
}
export default BrowseJobs;