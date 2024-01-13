import React from 'react';
import '../styles/Freelancerprofile.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { MdArrowOutward } from "react-icons/md";
import { CiCamera } from "react-icons/ci";

const FreelancerProfile = () => {
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
    const handleImage1Click = () => {
        // logic for what will happen when clicked on messaging image
    }

    const handleImage2Click = () => {
        // logic for what will happen when clicked on notifications image
    }

    const viewProfileClick = () => {
        navigate('/freelancerprofile');
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



    const switchToEmployerClick = () => {
        navigate('/employerprofile');
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

    const [inputAboutValue, setInputAboutValue] = useState('');
    const handleAboutChange = (event) => {
        setInputAboutValue(event.target.value);
    };


    const [newSkill, setNewSkill] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [newProject, setNewProject] = useState('');

    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [projects, setProjects] = useState([]);

    const [tempSkills, setTempSkills] = useState([]);  // to store the newly added skills, but only save them if 'save' button is pressed, else discard them
    const [tempLanguages, setTempLanguages] = useState([]);  // to store the newly added languages, but only save them if 'save' button is pressed, else discard them
    const [tempProjects, setTempProjects] = useState([]);

    const [leftBoxEditMode, setLeftBoxEditMode] = useState(false);
    const [rightBoxEditMode, setRightBoxEditMode] = useState(false);
    const [topBoxEditMode, setTopBoxEditMode] = useState(false);

    const [leftButtonImage, setLeftButtonImage] = useState(require('../assets/edit.jpg'));
    const [rightButtonImage, setRightButtonImage] = useState(require('../assets/edit.jpg'));
    const [topButtonImage, setTopButtonImage] = useState(require('../assets/edit.jpg'));

    const [newName, setNewName] = useState('');
    const [newJobCategory, setNewJobCategory] = useState('');
    const [newLocation, setNewLocation] = useState('');

    const [savedName, setSavedName] = useState('');
    const [savedJobCategory, setSavedJobCategory] = useState('');
    const [savedLocation, setSavedLocation] = useState('');

    const [jobsCompletedCount, setJobsCompletedCount] = useState('');
    const [ratePerHour, setRatePerHour] = useState('');

    const handleEditClick = (box) => {
        if (box === 'left') {
            setLeftBoxEditMode(true);
            setRightBoxEditMode(false);
            setTopBoxEditMode(false);
            setLeftButtonImage(require('../assets/editNew.jpg'));
            setRightButtonImage(require('../assets/edit.jpg'));
            setTopButtonImage(require('../assets/edit.jpg'));
        } else if (box === 'right') {
            setRightBoxEditMode(true);
            setLeftBoxEditMode(false);
            setTopBoxEditMode(false);
            setRightButtonImage(require('../assets/editNew.jpg'));
            setLeftButtonImage(require('../assets/edit.jpg'));
            setTopButtonImage(require('../assets/edit.jpg'));
        }
        else if (box === 'top') {
            setTopBoxEditMode(true);
            setLeftBoxEditMode(false);
            setRightBoxEditMode(false);
            setTopButtonImage(require('../assets/editNew.jpg'));
            setLeftButtonImage(require('../assets/edit.jpg'));
            setRightButtonImage(require('../assets/edit.jpg'));
        }
    };

    const handleAddProject = () => {
        if (newProject) {
            setTempProjects([...tempProjects, newProject]);
            setNewProject('');
        }
    };

    const handleAddSkill = () => {
        if (newSkill) {
            setTempSkills([...tempSkills, newSkill]);
            setNewSkill('');
        }
    };

    const handleAddLanguage = () => {
        if (newLanguage) {
            setTempLanguages([...tempLanguages, newLanguage]);
            setNewLanguage('');
        }
    };


    //fetching initial user profile values
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://35.154.4.80/api/v0/users/me',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                if (response.status === 200) {
                    const responseData = response.data;
                    console.log(responseData)
                    setSavedName(responseData.full_name);
                    setNewName(responseData.full_name);
                    setNewLocation(responseData.location.country);
                    setNewJobCategory(responseData.role);
                    setSavedJobCategory(responseData.role);
                    setSavedLocation(responseData.location.country);
                    setJobsCompletedCount(responseData.jobs_completed_count);
                    setRatePerHour(responseData.rate_per_hour);

                    setSkills(responseData.skills);
                    setLanguages(responseData.languages);

                    setTopBoxEditMode(false);
                    setLeftBoxEditMode(false);


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
        fetchUserProfile()
    }, []);


    //updating user profile values
    const updateUserProfile = async () => {
        try {
            const response = await axios.patch('http://35.154.4.80/api/v0/users/me', {
                first_name: newName,
                role: newJobCategory,
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
                const responseData = response.data;
                console.log(response)
                setSavedName(responseData.full_name);
                setSavedJobCategory(responseData.role);
                setSavedLocation(responseData.location.country);
                setJobsCompletedCount(responseData.jobs_completed_count);
                setRatePerHour(responseData.rate_per_hour);
                setTopBoxEditMode(false);

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

    // updating skills and languages
    const updateSkillsAndLanguages = async () => {
        try {
            const response = await axios.patch('http://35.154.4.80/api/v0/users/me', {
                skills: [...skills, ...tempSkills],
                languages: [...languages, ...tempLanguages],
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
                setSkills(responseData.skills || []);
                setLanguages(responseData.languages || []);
                setLeftBoxEditMode(false);

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

    //for skills and languages
    const handleSaveLeft = async () => {
        setLeftBoxEditMode(false);
        await updateSkillsAndLanguages();
        // setSkills([...skills, ...tempSkills]); // Add temporary skills to main skills
        // setLanguages([...languages, ...tempLanguages]); // Add temporary languages to main languages
        setNewSkill('');
        setNewLanguage('');
        setTempSkills([]);
        setTempLanguages([]);
        setLeftButtonImage(require('../assets/edit.jpg'));
    };

    const handleCancelLeft = () => {
        setLeftBoxEditMode(false);
        setNewSkill('');
        setNewLanguage('');
        setTempSkills([]); // Discard temporary skills
        setTempLanguages([]); // Discard temporary languages
        setLeftButtonImage(require('../assets/edit.jpg'));
    };

    //for about and projects
    const handleSaveRight = () => {
        setRightBoxEditMode(false);
        setProjects([...projects, ...tempProjects, newProject]); // Add the new project
        setNewProject('');
        setTempProjects([]);   //Reset temp projects
        setRightButtonImage(require('../assets/edit.jpg'));
    };

    const handleCancelRight = () => {
        setRightBoxEditMode(false);
        setNewProject('');
        setTempProjects([]);
        setInputAboutValue('');
        setRightButtonImage(require('../assets/edit.jpg'));
    };

    const clickLogout = () => {
        navigate('/')
    }

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
        <div>

            {/* first div for header */}
            <div className='headerStyle-freelancer' style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <h2 >Grull</h2>
                    <div >
                        <Button >Find Work</Button>
                    </div>
                    <div>
                        <Button className='postProjectButton' endIcon={<MdArrowOutward />}>Post a Project</Button>
                    </div>
                </div>

                <div>
                    <div>
                        <Button>Learn</Button>
                    </div>
                    <div>
                        <Button>Collaborate</Button>
                    </div>
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
                                        <div style={{ marginRight: '50px', display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ margin: '0', fontSize: '18px', color: 'black', fontWeight: 'bold', marginBottom: '-40px' }}>Name</p>
                                            <p style={{ margin: '0', fontSize: '16px', color: 'black', marginBottom: '1 px' }}>Job Category</p>
                                        </div>
                                    </div>
                                    <button style={{ backgroundColor: 'white', cursor: 'pointer', height: '38px', borderRadius: '20px', border: '1px solid #B27EE3', width: '280px', color: '#B27EE3', marginTop: '10px', marginLeft: '10px' }}
                                        onClick={viewProfileClick}>View Profile</button>
                                    <div >
                                        <NavLink style={{ marginLeft: '-130px', textDecoration: 'none', color: 'black' }} to="/">Dashboard</NavLink>
                                    </div>
                                    <div>
                                        <NavLink style={{ marginLeft: '-130px', textDecoration: 'none', color: 'black' }} to="/page2">Wallet</NavLink>
                                    </div>
                                    <div >
                                        <NavLink style={{ marginLeft: '-130px', textDecoration: 'none', color: 'black' }} to="/page3">Settings</NavLink>
                                    </div>
                                    <hr style={{ color: 'black', width: '280px' }} />
                                    <NavLink style={{ marginLeft: '-210px', textDecoration: 'none', color: 'black' }} to="/start" onClick={clickLogout}>Logout</NavLink>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* second div for profile bg */}
            <div className='profilepage'>
                <div className='firstcompprofile'>
                    <button className='switch-to-employer-button' onClick={switchToEmployerClick}>SWITCH TO AN EMPLOYER</button>

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
                                                padding: '5px', background: 'white',
                                                width: '150px', height: '70px', borderRadius: '15px', border: '1px solid black',
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <span style={{ color: '#ED8336', fontSize: '20px' }}> {jobsCompletedCount}</span>
                                                <span>Projects Completed</span>
                                            </div>
                                            <div style={{
                                                padding: '5px', background: 'white',
                                                width: '150px', height: '70px', borderRadius: '15px', border: '1px solid black', textAlign: 'center',
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <span style={{ color: '#ED8336', fontSize: '20px' }}>${ratePerHour}</span>
                                                <span>Per Hour</span>
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
                {/* third div for skills,languages and about */}
                <div className='skills-about'>

                    <div className='left-box'>
                        <div className='skills' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h2 style={{ marginLeft: '20px', flex: '1' }}>Skills</h2>
                                <button
                                    className='edit-button-two'
                                    style={{ backgroundImage: `url('${leftButtonImage}')` }}
                                    onClick={() => handleEditClick('left')}
                                ></button>
                            </div>

                            {leftBoxEditMode && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Add new skill"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                    />
                                    <button onClick={handleAddSkill}>+</button>
                                </div>
                            )}

                            {/* Display newly added skills */}
                                <ul>
                                    {skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            
                        </div>

                        <div className='languages'>
                            <h2 style={{ marginLeft: '20px' }}>Languages</h2>
                            {leftBoxEditMode && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Add new language"
                                        value={newLanguage}
                                        onChange={(e) => setNewLanguage(e.target.value)}
                                    />
                                    <button onClick={handleAddLanguage}>+</button>
                                </div>
                            )}

                            {/* Display newly added languages */}
                            <ul>
                                {languages.map((language, index) => (
                                    <li key={index}>{language}</li>
                                ))}
                            </ul>
                        </div>

                        {leftBoxEditMode && (
                            <div >
                                <div>
                                    <button className='save-button' onClick={handleSaveLeft}>Save</button>
                                </div>
                                <div>
                                    <button className='cancel-button' onClick={handleCancelLeft}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>



                    <div className='right-box'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2 style={{ marginLeft: '30px', flex: '1' }}>About</h2>
                            <button
                                className='edit-button-three'
                                style={{ backgroundImage: `url('${rightButtonImage}') ` }}
                                onClick={() => handleEditClick('right')}
                            ></button>
                        </div>
                        <input
                            type="text"
                            placeholder="Write something about you....."
                            value={inputAboutValue}
                            onChange={handleAboutChange}
                            className={`about-box ${rightBoxEditMode ? 'editable' : ''}`}
                            readOnly={!rightBoxEditMode}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px' }}>
                            <h2 style={{ marginLeft: '-5px', marginTop: '30px' }}>Ongoing Work/Portfolio</h2>
                            <a href="" style={{ marginLeft: 'auto', color: '#ED8335', fontWeight: 'bold' }}>Manage Projects</a>
                        </div>
                        <div style={{ marginLeft: '30px' }}>
                            <button className='portfolio-buttons'>All</button>
                            <button className='portfolio-buttons'>UI/UX</button>
                            <button className='portfolio-buttons'>3D Visualization</button>
                            <button className='portfolio-buttons'>Graphic Design</button>
                            <button className='portfolio-buttons'>Video Editing</button>
                        </div>

                        {rightBoxEditMode && (
                            <div className="box-container">
                                <input
                                    type="text"
                                    placeholder="Add ongoing work/project"
                                    value={newProject}
                                    onChange={(e) => setNewProject(e.target.value)}
                                />
                                <button onClick={handleAddProject}>+</button>
                            </div>
                        )}

                        {/* Displaying projects */}
                        {/* {projects.concat(tempProjects).map((project, index) => (
        <div key={index}>{project}</div>
    ))} */}

                        {projects.concat(tempProjects).map((project, index) => (
                            <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
                                <div style={{ border: '1px solid #8A2BE2', borderRadius: '5px', overflow: 'hidden' }}>
                                    <div style={{ background: '#8A2BE2', padding: '10px', borderRadius: '5px', color: '#FFFFFF' }}>
                                        {project}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {rightBoxEditMode && (
                            <div>
                                <div className="buttons-container">
                                    <div>
                                        <button className='save-button' onClick={handleSaveRight}>Save</button>
                                    </div>
                                    <div>
                                        <button className='cancel-button' onClick={handleCancelRight}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* foruth div for reviews */}
                <div className='review-box'>
                    <h2 style={{ marginLeft: '30px', flex: '1' }}>Reviews</h2>
                </div>
            </div>
        </div>
    )
};
export default FreelancerProfile;