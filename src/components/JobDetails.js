import React from "react";
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const JobDetails = () => {

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

    const viewProfileClick = () => {
        navigate('/employerprofile');
    }


    const container2 = useRef();
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

    //fetching the details of the job
    const accessToken = localStorage.getItem('accessToken');
    const { jobid } = useParams();
    const [jobDetails, setJobDetails] = useState(null);
    const [hoursAgo, setHoursAgo] = useState(null);
    const [requiredSkills, setRequiredSkills] = useState([]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://35.154.4.80/api/v0/jobs/${jobid}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
    
                if (response.status === 200) {
                    const createdAt = new Date(response.data.created_at);
                    const now = new Date();
                    const timeDifference = now - createdAt;
                    const hoursDifference = timeDifference / (1000 * 60 * 60);
    
                    setJobDetails(response.data);
                    setHoursAgo(Math.round(hoursDifference));
                    setRequiredSkills(response.data.required_skills);
                } else {
                    console.error('Error fetching job details:', response.data.error);
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
    
        fetchJobDetails();
    }, [jobid, accessToken]);
    


    const handleApplyNow = () => {
        navigate(`/applyproposal/${jobid}`);
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
                        style={{ marginLeft: '150px' }}
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

            {/* div 2  */}
            <div className='leftBox' style={{ display: 'flex', marginTop: '50px', marginLeft: '100px', marginBottom: '100px' }}>
                <div style={{ width: '850px', border: '1px solid #9c9b9b', borderRadius: '20px', height: '1000px', marginRight: '50px' }}>
                    <h1 style={{ marginLeft: '40px' }}>{jobDetails?.title}hi</h1>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                        <p style={{ marginRight: '20px' }}>Posted {hoursAgo} hours ago</p>
                        <p style={{ marginLeft: '100px' }}>{jobDetails?.location}</p>
                        <a href="" style={{ marginLeft: '300px', color: '#ED8335' }}>Download reference files</a>
                    </div>

                    <hr style={{ color: 'black', marginLeft: '30px', marginRight: '30px', height: '0.5px' }} />
                    <div className="job-details">
                        <p style={{ marginTop: '40px', marginLeft: '40px' }}>{jobDetails?.description}</p>
                    </div>

                    <hr style={{ color: 'black', marginLeft: '30px', marginRight: '30px', height: '0.5px' }} />
                    <div style={{ display: 'flex' }}>
                        <div style={{ color: 'white', marginLeft: '40px', width: '150px', height: '100px', backgroundColor: '#2E66EC', marginRight: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div>30+ Hours a week</div>
                        </div>

                        <div style={{ color: 'white', width: '150px', height: '100px', backgroundColor: '#2E66EC', marginRight: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div>More than 4 Months</div>
                        </div>

                        <div style={{ color: 'white', width: '150px', height: '100px', backgroundColor: '#2E66EC', marginRight: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div>Intermediate</div>
                        </div>

                        <div style={{ color: 'white', width: '150px', height: '100px', backgroundColor: '#2E66EC', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div>$12/hr-$15/hr</div>
                        </div>

                    </div>
                    <hr style={{ color: 'black', marginLeft: '30px', marginRight: '30px', height: '0.5px' }} />

                    <div>
                        <h3 style={{ marginLeft: '40px' }}>Skills and Expertise</h3>
                        <div style={{ display: 'flex' }}>
                            {requiredSkills.map((skill, index) => (
                                <div key={index} style={{
                                    color: 'white',
                                    width: '150px',
                                    height: '50px',
                                    backgroundColor: '#ED8335' ,
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft:'40px'
                                }}>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className='rightBox' style={{
                    width: '350px', border: '1px solid #9c9b9b', borderRadius: '20px', height: '1000px', marginLeft: '10px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>

                    <p style={{ marginTop: '-100px', color: '#B27EE3', fontSize: '13px', marginBottom: '10px' }}>Non Negotiable</p>
                    <button style={{ marginBottom: '15px', backgroundColor: '#B27EE3', color: 'white', height: '40px', borderRadius: '10px', border: 'none', width: '180px' }} onClick={handleApplyNow}>Apply Now</button>

                    <button style={{
                        display: 'flex',
                        alignItems: 'center', backgroundColor: 'white', height: '40px', border: '1px solid #B27EE3', color: '#B27EE3', borderRadius: '10px', width: '180px'
                    }}>
                        <img src={require('../assets/likeIcon2.png')} alt="Like Icon"
                            style={{ borderRadius: '50%', height: '20px', width: '20px', marginLeft: '30px' }}>
                        </img>
                        <p style={{ marginLeft: '10px' }}>Save Now</p>
                    </button>
                    <p style={{ marginTop: '5px' }}>Applicants :{ }</p>
                    <hr style={{ color: '#000000', width: '350px' }} />

                    <div>
                        <h2 style={{ marginLeft: '-30px' }}>About the Client</h2>
                        <p style={{ marginLeft: '-30px' }}>,{jobDetails?.location}</p>
                        <p style={{ marginLeft: '-30px' }}>4.5 star of 1328 reviews</p>
                        <p style={{ marginLeft: '-30px' }}>{jobDetails?.company_description}</p>
                    </div>

                    <hr style={{ color: 'black', width: '350px', height: '0.5px' }} />
                    <div>
                        <p style={{ marginLeft: '-70px' }}>38 jobs posted</p>
                        <p style={{ marginLeft: '-70px', marginTop: '-15px', fontSize: '13px' }}>79% hire rate, 1 open job</p>
                    </div>
                    <hr style={{ color: 'black', width: '350px', height: '0.5px' }} />
                    <div>
                        <p style={{ marginLeft: '-95px' }}>$21K total spent</p>
                        <p style={{ marginLeft: '-95px', marginTop: '-15px', fontSize: '13px' }}>42 hires, 25 active</p>
                    </div>
                    <hr style={{ color: 'black', width: '350px', height: '0.5px' }} />
                    <div>
                        <p style={{ marginLeft: '1px' }}>$8.02 /hr avg hourly rate paid</p>
                        <p style={{ marginLeft: '1px', marginTop: '-15px', fontSize: '13px' }}>1815 hours</p>
                    </div>
                    <hr style={{ color: 'black', width: '350px', height: '0.5px' }} />
                    <div>
                        <p style={{ marginLeft: '-40px' }}>Art & Design</p>
                        <p style={{ marginLeft: '-40px', marginTop: '-15px', fontSize: '13px' }}>Small company (2-9 people)</p>
                    </div>
                    <hr style={{ color: 'black', width: '350px', height: '0.5px' }} />

                </div>
            </div>


        </div>
    )
}
export default JobDetails;