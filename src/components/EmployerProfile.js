import React from 'react';
import '../styles/Freelancerprofile.css';
import '../styles/Employerprofile.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { MdArrowOutward } from "react-icons/md";
import { CiCamera } from "react-icons/ci";

const Employerprofile = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const avatarBackgroundColor = 'Grey';
    const getInitials = (name) => {
        // Check if name is defined before splitting
        if (name) {
            const names = name.split(' ');
            return names[0][0].toUpperCase();
        } else {
            return ''; // Handle the case where name is undefined
        }
    };
    const handlePostJobClick = () => {
        navigate('/postjob');
    }

    const handleBrowseFreelancerClick = () => {
        navigate('/browsefreelancer');
    }
    const handleImage2Click = () => {
        // logic for what will happen when clicked on notifications image
    }

    const viewProfileClick = () => {
        navigate('/employerprofile');
    }
    const clickLogout = () => {
        navigate('/')
    }
    const container = useRef();
    const [showDropdown, setShowDropdown] = useState(false);
    const clickProfileImage = () => {
        // setShowDropdown(!showDropdown);
        setShowDropdown((prevState) => ({ open: !prevState.open }));
    }
    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setShowDropdown({ open: false });
        }
    };
    // attaches an eventListener to listen when componentDidMount
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        // optionally returning a func in useEffect runs like componentWillUnmount to cleanup
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleFreelancerClick = () => {
        navigate('/freelancerprofile');
    }

    const handleFileChange = (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (file) {
            //  with the selected file, set it as the current profile picture
            const reader = new FileReader();
            reader.onload = function (e) {
                const profileImage = document.querySelector('.user-picture-img');
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }


    const [rightBoxEditMode, setRightBoxEditMode] = useState(false);
    const [topBoxEditMode, setTopBoxEditMode] = useState(false);

    const [rightButtonImage, setRightButtonImage] = useState(require('../assets/edit.jpg'));
    const [topButtonImage, setTopButtonImage] = useState(require('../assets/edit.jpg'));

    const [newName, setNewName] = useState('');
    const [newJobCategory, setNewJobCategory] = useState('');
    const [newLocation, setNewLocation] = useState('');

    const [savedName, setSavedName] = useState('');
    const [savedJobCategory, setSavedJobCategory] = useState('');
    const [savedLocation, setSavedLocation] = useState('');

    const [jobsPostedCount, setJobsPostedCount] = useState('');
    const [avgRateOffered, setAvgRateOffered] = useState('');

    const [inputAboutEmployer, setInputAboutEmployer] = useState('');
    const handleAboutChange = (event) => {
        setInputAboutEmployer(event.target.value);
    };

    const [inputAboutCompany, setInputAboutCompany] = useState('');
    const handleAboutCompanyChange = (event) => {
        setInputAboutCompany(event.target.value);
    }
 
    const handleEditClick = (box) => {
        if (box === 'right') {
            setRightBoxEditMode(true);
            setTopBoxEditMode(false);
            setRightButtonImage(require('../assets/editNew.jpg'));
            setTopButtonImage(require('../assets/edit.jpg'));
        }
        else if (box === 'top') {
            setTopBoxEditMode(true);
            setRightBoxEditMode(false);
            setTopButtonImage(require('../assets/editNew.jpg'));
            setRightButtonImage(require('../assets/edit.jpg'));
        }
    };


    //fetching initial values for the variables
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {

                const response = await axios.get('http://35.154.4.80/api/v0/users/me', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const responseData = response.data;
                    console.log(response)

                    setSavedName(responseData.full_name);
                    setNewName(responseData.full_name);
                    setSavedLocation(responseData.location.country);
                    setNewLocation(responseData.location.country);
                    setNewJobCategory(responseData.role);
                    setSavedJobCategory(responseData.role);

                    setInputAboutEmployer(responseData.description);

                    setTopBoxEditMode(false);
                    setRightBoxEditMode(false);

                } else if (response.status === 400) {
                    // Handle error (e.g., show error message)
                    alert('A user with this email already exists');
                    console.error('Failed to update user profile');
                }
                else if (response.status === 401) {
                    alert('Missing token or inactive value');
                }
            } catch (error) {
                // Handle network error or other issues
                console.error('Network error:', error);
            }
        };

        fetchUserProfile();
    }, []); // Empty dependency array ensures the effect runs once when the component mounts


    // change user details
    const updateUserProfile = async () => {
        try {
            const response = await axios.patch('http://35.154.4.80/api/v0/users/me', {
                first_name: newName,
                description: newJobCategory,
                location: {
                    city: '',
                    state: '',
                    country: newLocation,
                },
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

            if (response.status === 200) {
                const { jobs_posted_count, average_rate_offered } = response.data;

                setSavedName(newName);
                setSavedJobCategory(newJobCategory);
                setSavedLocation(newLocation);
                setJobsPostedCount(jobs_posted_count);
                setAvgRateOffered(average_rate_offered);

                setTopBoxEditMode(false); // Exit edit mode

            } else if (response.status === 400) {
                // Handle error (e.g., show error message)
                alert('A user with this email already exists');
                console.error('Failed to update user profile');
            }
            else if (response.status === 401) {
                alert('Missing token or inactive value');
            }
        } catch (error) {
            // Handle network error or other issues
            console.error('Network error:', error);
        }
    };

    // updating about value
    const updateAbout = async () => {
        try {
            const response = await axios.patch('http://35.154.4.80/api/v0/users/me', {
                description: inputAboutEmployer,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                const responseData = response.data;
                console.log(response)
                // Update the state with the response from the backend
                setInputAboutEmployer(responseData.description);
                setRightBoxEditMode(false);

            } else {
                // Handle error
                console.error('Failed to update skills and languages');
            }
        } catch (error) {
            // Handle network error or other issues
            console.error('Network error:', error);
        }
    };


    const handleSaveTop = async () => {
        setTopBoxEditMode(false);
        await updateUserProfile();
        setTopButtonImage(require('../assets/edit.jpg'));
    }

    const handleCancelTop = () => {
        setTopBoxEditMode(false);
        setNewName('');
        setNewJobCategory('');
        setNewLocation('');
        setTopButtonImage(require('../assets/edit.jpg'));
    }

    const handleSaveAbout = async () => {
        setRightBoxEditMode(false);
        await updateAbout();
        setRightButtonImage(require('../assets/edit.jpg'));
    };

    const handleCancelAbout = () => {
        setRightBoxEditMode(false);
        setRightButtonImage(require('../assets/edit.jpg'));
    };


    //view posted jobs
    const [postedJobs, setPostedJobs] = useState([]);
    const [weeksAgoMap, setWeeksAgoMap] = useState({});
    useEffect(() => {
        const fetchPostedJobs = async () => {
            try {
                const response = await axios.get('http://35.154.4.80/api/v0/users/me/jobs', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setPostedJobs(response.data.results); // Assuming the API response is an array of jobs

                    // Calculate weeks ago for each job
                    const newWeeksAgoMap = {};
                    response.data.results.forEach((job) => {
                        const created_at = new Date(job.created_at);
                        const timeDifference = new Date() - created_at;
                        const weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
                        newWeeksAgoMap[job.job_id] = weeksDifference;
                    });

                    // Update weeksAgoMap state
                    setWeeksAgoMap(newWeeksAgoMap);
                } else {
                    console.error('Error fetching posted jobs:', response.data.error);
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };

        fetchPostedJobs();
    }, [accessToken]);

    const JobCategoryOptions = [
        { value: 'GRAPHIC_DESIGNER', label: 'Graphic Designer' },
        { value: 'ILLUSTRATOR', label: 'Illustrator' },
        { value: 'PROGRAMMER', label: 'Programmer' },
        { value: 'VIDEO_EDITOR', label: 'Video Editor' },
        { value: 'THREE_D_ARTIST', label: '3D Artist' },
        { value: 'PRODUCT_DESIGNER', label: 'Product Designer' },
    ];


    const LocationOptions = [
        { value: 'INDIA', label: 'India' },
        { value: 'USA', label: 'USA' },
        { value: 'CANADA', label: 'Canada' },
        { value: 'ENGLAND', label: 'England' },
        { value: 'CHINA', label: 'China' },
        { value: 'RUSSIA', label: 'Russia' }
    ];
    return (
        <div style={{ overflowX: 'hidden' }}>

            {/* first div for header */}
            <div className='headerStyle-freelancer' style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <h2 >Grull</h2>
                    <div >
                        <Button >Find Work</Button>
                    </div>
                    <div>
                        <Button className='postProjectButton' endIcon={<MdArrowOutward />} onClick={handlePostJobClick}>Post Job</Button>
                    </div>
                </div>

                <div>
                    <div className='imageContainer' style={{ display: 'flex', alignItems: 'center' }}>
                        <FiMessageSquare style={{ color: '#fff', fontSize: '30px' }} />
                        <IoMdNotificationsOutline style={{ color: '#fff', fontSize: '35px' }} />
                        <div ref={container} className='container'>
                            <Avatar
                                alt={savedName}
                                style={{ backgroundColor: avatarBackgroundColor }}
                                className='dashboardavatar profile'
                                onClick={clickProfileImage}
                            >
                                {getInitials(savedName)}
                            </Avatar>
                            {showDropdown.open && (
                                <div className='dropdown'>
                                    <div className="user-info" style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '10px' }}>
                                        <img src={require('../assets/FreelancerProfileHeaderProfile.jpg')} style={{ height: '80px', width: '80px', borderRadius: '50%' }} alt="User Profile" className="profile-image" />
                                        <div style={{ marginLeft: '30px' }}>
                                            <p style={{ margin: '0', fontSize: '18px', marginBottom: '2px', color: 'black', fontWeight: 'bold' }}>Name</p>
                                            <p style={{ margin: '0', fontSize: '16px', marginTop: '-2px', color: 'black' }}>Job Category</p>
                                        </div>
                                    </div>
                                    <button style={{ backgroundColor: 'white', cursor: 'pointer', height: '45px', borderRadius: '20px', border: '1px solid #B27EE3', width: '280px', color: '#B27EE3', marginTop: '10px', marginLeft: '10px' }}
                                        onClick={viewProfileClick}>View Profile</button>
                                    <div >
                                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/client">Dashboard</NavLink>
                                    </div>
                                    <div>
                                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/client">Wallet</NavLink>
                                    </div>
                                    <div >
                                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/">Settings</NavLink>
                                    </div>
                                    <hr />
                                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/" onClick={clickLogout}>Logout</NavLink>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* second div for profile bg */}
            <div className='profilepage'>
                <div className='firstcompprofile'>
                    <button className='switch-to-employer-button' onClick={handleFreelancerClick}>SWITCH TO FREELANCER</button>

                    <div style={{ position: 'relative' }}>
                        <img src={require('../assets/profileBg.png')} alt="" className='profile-background-image'></img>

                        <div style={{
                            position: 'absolute',
                            top: '5%',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '94%',
                            left: '3%',
                            gap: '100px'
                        }}>
                            <div>
                                <button className='edit-button'
                                    style={{ backgroundImage: `url('${topButtonImage}')` }}
                                    onClick={() => handleEditClick('top')}>
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
                                    <div className='user-picture'>
                                        <Avatar
                                            className='user-picture-img'
                                            alt={savedName}
                                            style={{ backgroundColor: avatarBackgroundColor }}
                                        >
                                            {getInitials(savedName)}
                                        </Avatar>
                                        <label htmlFor="fileInput" className='camera-icon-label'>
                                            <CiCamera className='camera-icon' />
                                        </label>
                                        {topBoxEditMode && (
                                            <input
                                                type="file"
                                                id="fileInput"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                        )}
                                    </div>
                                    <>
                                        {!topBoxEditMode && (
                                            <div >
                                                <div style={{ fontSize: '24px', fontWeight: '700' }}>{savedName}</div>
                                                <div style={{ fontSize: '16px' }}>{savedJobCategory}</div>
                                                <div style={{ fontSize: '16px' }}>{savedLocation}</div>
                                            </div>
                                        )}
                                        {topBoxEditMode && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '5px'
                                            }}>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        value={newName}
                                                        onChange={(e) => setNewName(e.target.value)}
                                                        style={{ padding: '10px', width: '170px', borderRadius: '16px', border: '1px solid #DDD' }}
                                                    />
                                                </div>
                                                <div>
                                                    <select
                                                        value={newJobCategory}
                                                        onChange={(e) => setNewJobCategory(e.target.value)}
                                                        style={{ padding: '10px', width: '190px', borderRadius: '16px', border: '1px solid #DDD' }}
                                                    >
                                                        <option value="" disabled>Select Job Category</option>
                                                        {JobCategoryOptions.map((option) => (
                                                            <option key={option.value} value={option.value}>{option.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <select
                                                        value={newLocation}
                                                        onChange={(e) => setNewLocation(e.target.value)}
                                                        style={{ padding: '10px', width: '190px', borderRadius: '16px', border: '1px solid #DDD' }}
                                                    >
                                                        <option value="" disabled>Select Location</option>
                                                        {LocationOptions.map((option) => (
                                                            <option key={option.value} value={option.value}>{option.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
                                    {!topBoxEditMode && (
                                        <div style={{
                                            display: 'flex', gap: '10px', flexDirection: 'row'
                                        }}>
                                            <div style={{
                                                marginRight: '20px', padding: '5px', background: 'white',
                                                width: '150px', height: '70px', borderRadius: '15px', border: '1px solid black',
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <span style={{ color: '#ED8336', fontSize: '20px' }}>{jobsPostedCount}</span>
                                                <span>Jobs Posted</span>
                                            </div>
                                            <div style={{
                                                marginRight: '10px', padding: '5px', background: 'white',
                                                width: '150px', height: '70px', borderRadius: '15px', border: '1px solid black', textAlign: 'center',
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <span style={{ color: '#ED8336', fontSize: '20px' }}>${avgRateOffered}</span>
                                                <span>Avg. Budget</span>
                                            </div>
                                        </div>
                                    )}
                                    {topBoxEditMode && (
                                        <div style={{ display: 'flex', gap: '10px', flexDirection: 'row' }} className='edit-buttons-container'>
                                            <div>
                                                <button className='cancel-button' onClick={handleCancelTop}>Cancel</button>
                                            </div>
                                            <div>
                                                <button className='save-button' onClick={handleSaveTop}>Save</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* third div for about and posted jobs */}
            <div className='about-postJobs'>

                <div className='first-box'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ marginLeft: '50px', flex: '1' }}>About</h2>
                        <button
                            className='edit-button-three'
                            style={{ backgroundImage: `url('${rightButtonImage}')` }}
                            onClick={() => handleEditClick('right')}
                        ></button>
                    </div>

                    <input
                        type="text"
                        placeholder="Write something about you....."
                        value={inputAboutEmployer}
                        onChange={handleAboutChange}
                        className={`first-box-one ${rightBoxEditMode ? 'editable' : ''}`}
                        readOnly={!rightBoxEditMode}
                    />
                    <input
                        type="text"
                        placeholder=""
                        value={inputAboutCompany}
                        onChange={handleAboutCompanyChange}
                        className={`first-box-two ${rightBoxEditMode ? 'editable' : ''}`}
                        readOnly={!rightBoxEditMode}
                    />

                    {rightBoxEditMode && (
                        <div>
                            <div className="buttons-container">
                                <div style={{ marginLeft: '730px' }}>
                                    <button className='cancel-button' onClick={handleCancelAbout}>Cancel</button>
                                </div>
                                <div style={{ marginLeft: '20px' }}>
                                    <button className='save-button' onClick={handleSaveAbout}>Save</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px' }}>
                        <h2 style={{ marginLeft: '15px', marginTop: '60px' }}>Posted Jobs</h2>

                        {!rightBoxEditMode && (
                            <a href="" style={{ marginRight: '80px', color: '#b27ee3', fontWeight: 'bold' }}>Edit Jobs</a>
                        )}
                    </div>

                    {!rightBoxEditMode && (
                        <div className='inside-posted-jobs'>
                            {postedJobs.map((job) => (
                                <div key={job.job_id} style={{ borderRadius: '20px', border: '1px solid #9c9b9b', marginBottom: '30px', padding: '10px' }}>

                                    <div style={{ marginBottom: '-15px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                                        <h3>{job.title}</h3>
                                        <p style={{ fontSize: '12px', color: '#B27EE3', marginLeft: '150px' }}>{job.job_applicants_count} FREELANCERS APPLIED</p>
                                    </div>

                                    <div style={{ marginBottom: '5px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                                        <p>Budget: $ {job.rate_per_hour}</p>
                                        <p style={{ fontSize: '12px', color: '#9c9b9b', marginLeft: '50px' }}>Posted {weeksAgoMap[job.job_id] !== undefined ? `${weeksAgoMap[job.job_id]} weeks` : 'loading...'} ago</p>
                                    </div>

                                    <div style={{ marginBottom: '18px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                                        {job.required_skills.map((skill, index) => (
                                            <div key={index} style={{ backgroundColor: 'orange', color: 'white', borderRadius: '5px', padding: '5px', marginRight: '5px' }}>
                                                {skill}
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ borderRadius: '10px', border: '1px solid #d2d1d1', height: '30px', width: '150px', marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                                        {job.status === 'PENDING' && (
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'orange', marginLeft: '10px', marginRight: '15px' }}></div>
                                        )}
                                        {job.status === 'COMPLETED' && (
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red', marginLeft: '10px', marginRight: '15px' }}></div>
                                        )}
                                        {job.status === 'ACTIVE' && (
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'green', marginLeft: '10px', marginRight: '15px' }}></div>
                                        )}
                                        <p style={{ color: '#4301A2' }}>{job.status}</p>
                                    </div>

                                    {/* Display other job details as needed */}
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* foruth div for reviews */}
            <div className='review-box-employer'>
                <h2 style={{ marginLeft: '30px', flex: '1' }}>Reviews</h2>
            </div>
        </div>
    )
};
export default Employerprofile;