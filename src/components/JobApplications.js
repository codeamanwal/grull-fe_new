import React from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/Browsejobs.css';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const JobApplications = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  
  const container = useRef();
  const [dropdownState, setDropdownState] = useState({ open: false });
  const handleDropdownClick = () =>
    setDropdownState((prevState) => ({ open: !prevState.open }));

  const handleClickOutside = (e) => {
    if (container.current && !container.current.contains(e.target)) {
      setDropdownState({ open: false });
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
  useEffect (()=>{
     const getjobs=async()=>{
        try{
          const response = await axios.get(`http://35.154.4.80/api/v0/jobs/${job}/applications`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            console.log(response.data.result)
            if (response.status===200) {
                console.log('Applications Fetchedd successfully');
            }
        }
        catch (error) {
          console.error('Error occurred:', error);
      }
     }
     getjobs();
  },[])
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

  return (
    <div>
      {/* div 1 for header */}
      <div className='headerStyle' style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginLeft: '80px', marginTop: '16px' }}>Grull</h2>

        <div className='buttonContainer'>
          <button className='browse-jobs' onClick={ClickBrowseJobs}>Browse Jobs &#9660;</button>
        </div>

        <div className='container' ref={container}>
          <button
            type="button"
            className='browse-jobs'
            onClick={handleDropdownClick}
            style={{ width: '120px', marginLeft: '50px' }}
          >
            Manage Jobs &#9660;
          </button>
          {dropdownState.open && (
            <div className='dropdown' style={{ width: '160px', height:'180px',marginTop: '20px',marginLeft:'20px', backgroundColor: 'white', border: '1px solid #9c9b9b', borderRadius: '20px' }}>
              <ul style={{textAlign:'center'}}>
                <li><NavLink to='/managejobs/applied' style={{ color: '#303030', display: 'block',textDecoration:'none',padding:'2px'}}>Applied Jobs</NavLink></li>
                <li><NavLink to='/managejobs/saved' style={{ color: '#303030', display: 'block',textDecoration:'none',padding:'2px' }}>Saved Jobs</NavLink></li>
                <li><NavLink to='/managejobs/ongoing' style={{ color: '#303030', display: 'block',textDecoration:'none',padding:'2px' }}>Ongoing Jobs</NavLink></li>
                <li><NavLink to='/managejobs/completed' style={{ color: '#303030', display: 'block' ,textDecoration:'none',padding:'2px'}}>Completed Jobs</NavLink></li>
              </ul>
            </div>
          )}
        </div>

        <div className='searchContainer'>
          <input
            type='text'
            placeholder='Search for Jobs, Projects or company'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-container'
            style={{ marginLeft: '150px' }}
          />

          {/* <button className='searchButton' onClick={() => handleSearch(searchQuery)}>
                    Search
                </button> */}
        </div>
        <div className='imageContainer' style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
          <img src={require('../assets/FreelancerProfileHeaderNotif.jpg')} alt="" className='notification' onClick={handleImage2Click} />
          
          <div className='container2' ref={container2}>
                        <img src={require('../assets/FreelancerProfileHeaderProfile.jpg')} alt="" className='profile' onClick={clickProfileImage}/>

                        {showDropdown.open && (
                            <div className='dropdown' style={{marginTop:'-392px',marginLeft:'-250px'}}>
                                <div className="user-info" style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '10px' }}>
                                    <img src={require('../assets/FreelancerProfileHeaderProfile.jpg')} style={{ height: '80px', width: '80px', borderRadius: '50%' }} alt="User Profile" className="profile-image" />
                                    <div style={{ marginLeft: '30px' }}>
                                        <p style={{ margin: '0', fontSize: '18px', marginBottom: '2px', color: 'black', fontWeight: 'bold' }}>Name</p>
                                        <p style={{ margin: '0', fontSize: '16px', marginTop: '-2px', color: 'black' }}>Job Category</p>
                                    </div>
                                </div>
                                <button style={{ backgroundColor: 'white', cursor: 'pointer', height: '38px', borderRadius: '20px', border: '1px solid #B27EE3', width: '280px', color: '#B27EE3', marginTop: '10px', marginLeft: '10px' }}
                                    onClick={viewProfileClick}>View Profile</button>
                                <div style={{ marginTop: '15px' }}>
                                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/client">Dashboard</NavLink>
                                </div>
                                <div style={{ marginTop: '8px' }}>
                                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/page2">Wallet</NavLink>
                                </div>
                                <div style={{ marginTop: '8px' }}>
                                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/page3">Settings</NavLink>
                                </div>
                                <hr style={{ marginTop: '15px' }} />
                                <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/start">Logout</NavLink>

                            </div>
                        )}
                    </div>
                    
        </div>
      </div>


      {/* div 2 for box and browse, search bar */}
      <div className='rectangle'></div>
      <div className='search-bar'>
        <h1 style={{ color: 'white', marginLeft: '150px', marginTop: '50px' }}>Browse</h1>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder=" Search for Projects"
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
          <a href="" className='projects'>Projects</a>
          <a href="" className='contest'>Contest</a>
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
        <div className='browseJobs-left-box'>
          <div className='category' style={{ marginBottom: '40px' }}>
            <h2 style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={toggleCategory}>
              Category <span style={{ marginLeft: '124px' }}>{categoryExpanded ? '⮙' : '⮛'}</span>
            </h2>

            {categoryExpanded && (
              <div style={{ marginLeft: '10px' }}>
                <div style={{ position: 'relative', marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder=" Search categories"
                    style={{
                      marginRight: '30px', borderRadius: '10px', border: '1px solid #D9D9D9',
                      height: '32px', width: '200px', marginLeft: '10px',
                      paddingLeft: '40px', // Adjust padding to make space for the image
                      fontFamily: 'Font Awesome 5 Free',
                    }}
                  />
                  <FontAwesomeIcon icon={faSearch} style={{
                    position: 'absolute', left: '20px', top: '50%',
                    transform: 'translateY(-50%)', zIndex: 1, color: '#957474',
                  }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Graphic Designer
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Illustrator
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Programmer
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Video Editor
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    3D Artist
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Product Designer
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className='experience-level' style={{ marginBottom: '40px' }}>
            <h2 style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={toggleExperience}>
              Experience Level <span style={{ marginLeft: '40px' }}>{experienceExpanded ? '⮙' : '⮛'}</span> </h2>

            {experienceExpanded && (
              <div style={{ marginLeft: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Beginner
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Intermediate
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Advanced
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Expert
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className='job-type' style={{ marginBottom: '40px' }}>
            <h2 style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={toggleJob}>
              Job Type <span style={{ marginLeft: '125px' }}>{jobExpanded ? '⮙' : '⮛'}</span></h2>

            {jobExpanded && (
              <div>
                <div style={{ marginLeft: '10px', marginBottom: '20px' }}>
                  <label>
                    <input type="checkbox" style={{ fontSize: '20px' }} />
                    Hourly
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px', marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>
                      <input type="checkbox" />
                    </label>
                    <label style={{ marginRight: '10px' }}>
                      <input type="text" placeholder="$ min" style={{ width: '40px' }} />
                      <span style={{ color: '#808080' }}>/hr</span>
                    </label>
                    <label style={{ marginRight: '10px' }}>
                      <input type="text" placeholder="$ max" style={{ width: '40px' }} />
                      <span style={{ color: '#808080' }}>/hr</span>
                    </label>
                  </div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <label>
                    <input type="checkbox" style={{ fontSize: '20px' }} />
                    Fixed-Price
                  </label>
                  <div style={{ marginLeft: '30px', marginTop: '15px' }}>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        Less than $100
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        $100 to $500
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        $500 to $1k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        $1k to $5k
                      </label>
                    </div>
                    <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                      <label>
                        <input type="checkbox" />
                        $5k +
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='location' style={{ marginBottom: '40px' }}>
            <h2 style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={toggleLocation}>
              Location <span style={{ marginLeft: '125px' }}>{locationExpanded ? '⮙' : '⮛'}</span></h2>
            {locationExpanded && (
              <div style={{ marginLeft: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    India
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    USA
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Canada
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    England
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    China
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" />
                    Russia
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='browseJobs-right-box'></div>
      </div>

    </div>
  )
}
export default JobApplications;