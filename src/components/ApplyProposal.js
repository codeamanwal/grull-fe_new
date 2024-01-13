import React, { useRef, useState, useEffect } from 'react';
import '../styles/Applyproposal.css';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ApplyProposal = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const accessToken = localStorage.getItem('accessTokenFreelancer');
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


    const handleSearch = (query) => {
        // Perform actions based on the search query
        console.log(`Performing search for: ${query}`);
        // or implement additional logic here, such as fetching search results or updating the UI.
    };

    const CurrencyOptions = [
        { value: 'INDIA', label: 'INR' },
        { value: 'USA', label: 'USD' },
        { value: 'CANADA', label: 'CAD' },
        { value: 'ENGLAND', label: 'GBP' },
        { value: 'CHINA', label: 'CNY' },
        { value: 'RUSSIA', label: 'RUB' },
    ];


    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Selected File:', file);
        setSelectedFile(file);
    };

    const handleArrowClick = () => {
        fileInputRef.current.click();
    };

    const handleReviewProfile = () => {
        navigate('/employerprofile');
    }

    const handleViewJobRequirements = () => {

    }

    const handleCancelClick = () => {
        navigate('/employerprofile');
    }
    const { jobid } = useParams();
    const handleSaveClick = async() => {
        try{
            const proposal = document.querySelector('[name="proposal"]').value;
            const proposed_rate = document.querySelector('[name="proposed_rate"]').value;
            const response = await axios.post(`http://35.154.4.80/api/v0/jobs/${jobid}/apply`, 
                 {"proposed_rate":proposed_rate,"proposal":proposal},{
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
                  },
              });
              console.log(response);
              if (response.status===200) {
                  console.log('Applied Proposal successfully');
                  navigate('/managejobs/applied');
              }
          }
          catch (error) {
            console.error('Error occurred:', error);
        }
        
    }

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
                        <div className='dropdown' style={{ width: '160px', height: '180px', marginTop: '20px', marginLeft: '20px', backgroundColor: 'white', border: '1px solid #9c9b9b', borderRadius: '20px' }}>
                            <ul style={{ textAlign: 'center' }}>
                                <li><NavLink to='/managejobs/applied' style={{ color: '#303030', display: 'block', textDecoration: 'none', padding: '2px' }}>Applied Jobs</NavLink></li>
                                <li><NavLink to='/managejobs/saved' style={{ color: '#303030', display: 'block', textDecoration: 'none', padding: '2px' }}>Saved Jobs</NavLink></li>
                                <li><NavLink to='/managejobs/ongoing' style={{ color: '#303030', display: 'block', textDecoration: 'none', padding: '2px' }}>Ongoing Jobs</NavLink></li>
                                <li><NavLink to='/managejobs/completed' style={{ color: '#303030', display: 'block', textDecoration: 'none', padding: '2px' }}>Completed Jobs</NavLink></li>
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
                    />

                    {/* <button className='searchButton' onClick={() => handleSearch(searchQuery)}>
                    Search
                </button> */}
                </div>
                <div className='imageContainer' style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                    <img src={require('../assets/FreelancerProfileHeaderNotif.jpg')} alt="" className='notification' onClick={handleImage2Click} />

                    <div className='container2' ref={container2}>
                        <img src={require('../assets/FreelancerProfileHeaderProfile.jpg')} alt="" className='profile' onClick={clickProfileImage} />

                        {showDropdown.open && (
                            <div className='dropdown' style={{ marginTop: '-392px', marginLeft: '-250px' }}>
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

            {/* div 2 for making the input form */}
            <div className='input-form'>
                <Form>
                    <h2 style={{ marginTop: '40px', marginBottom: '40px' }}>Proposal</h2>
                    <Form.Group className='form-group' style={{ flex: '1' }} controlId="form">
                        <h4>Why are you fit for this job?</h4>
                        <Form.Control style={{ width: '510px', height: '200px' }} className='form-val' type="text" name='proposal' placeholder="Enter answer here" />
                    </Form.Group>

                    <h4 style={{ marginTop: '40px' }}>Any files to support your proposal</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="text"
                                placeholder="Upload your file here"
                                className="form-control"
                                style={{ width: '500px', height: '30px', borderRadius: '12px', border: '1px solid #ddd' }}
                            />
                            <button onClick={handleArrowClick}>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                        </div>
                        <input
                            type="file"
                            id="fileInput"
                            ref={fileInputRef}
                            accept=".pdf"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>

                    <h4 style={{ marginTop: '40px' }} >What is your Proposed rate?</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Form.Group className="mb-3 form-group" controlId="formBudget">
                            <Form.Control style={{ width: '180px', height: '33px' }} className='form-vals-two' type="text" name='proposed_rate' placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formCurrency">
                            <Select
                                options={CurrencyOptions} placeholder="Select"
                                styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '180px', height: '2px' }) }}
                            />
                        </Form.Group>
                    </div>
                </Form>
            </div>

            <div style={{ marginTop: '30px' }}>
                <div>
                    <a href="" style={{ marginLeft: '80px', color: '#b27ee3' }} onClick={handleReviewProfile}>Review Profile</a>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <a href="" style={{ marginLeft: '80px', color: '#b27ee3' }} onClick={handleViewJobRequirements}>View Job Requirements</a>
                </div>
            </div>

            <div style={{ marginTop: '50px', marginBottom: '50px', marginLeft: '40px' }}>
                <button className='cancel-button' onClick={handleCancelClick}>Cancel</button>
                <button className='save-button' onClick={handleSaveClick}>Save</button>
            </div>
        </div >
    )
};

export default ApplyProposal;