import React from 'react';
import '../styles/Freelancerprofile.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { CiLocationOn } from "react-icons/ci";
import { MdWorkOutline } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import Header1 from './Header1';
import Avatar from '@mui/material/Avatar';
import { Box, Chip } from '@mui/material';
import { useLocation } from 'react-router-dom';

const FreelancerProfile = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
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


    const [newSkill, setNewSkill] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [newProject, setNewProject] = useState('');
    const [newPortfolio, setNewPortfolio] = useState('');

    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [portfolios, setPortfolios] = useState([]);

    const [tempSkills, setTempSkills] = useState([]);  // to store the newly added skills, but only save them if 'save' button is pressed, else discard them
    const [tempLanguages, setTempLanguages] = useState([]);  // to store the newly added languages, but only save them if 'save' button is pressed, else discard them
    const [tempProjects, setTempProjects] = useState([]);
    const [tempPortfolios, setTempPortfolios] = useState([]);

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

    const [inputAboutValue, setInputAboutValue] = useState('');
    const [newinputval,setnewinputval]= useState('');

    const filters=['All','UI/UX','3d Visualization','Graphic Design','Video Editing']

    const handleAboutChange = (event) => {
        setnewinputval(event.target.value);
        updateTextareaHeight(event.target);
    };
    const updateTextareaHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
      };
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

    const handleAddSkill = () => {
        if (newSkill) {
            setTempSkills([...tempSkills, newSkill]);
            setNewSkill('');
        }
    };
    
    const handleDeleteSkill = (index) => {
        const updatedSkills = [...tempSkills];
        updatedSkills.splice(index, 1);
        setTempSkills(updatedSkills);
      };

    const handleAddLanguage = () => {
        if (newLanguage) {
            setTempLanguages([...tempLanguages, newLanguage]);
            setNewLanguage('');
        }
    };

    const handleDeleteLanguage = (index) => {
        const updatedLanguages = [...tempLanguages];
        updatedLanguages.splice(index, 1);
        setTempLanguages(updatedLanguages);
    };

    const handleAddProject = () => {
        if (newProject) {
            setTempProjects([...tempProjects, newProject]);
            console.log(tempProjects);
            setNewProject('');
        }
    };

    const handleAddPortfolio = () => {
        if (newPortfolio) {
            setTempPortfolios([...tempPortfolios, newPortfolio]);
            setNewPortfolio('');
        }
    };

    //fetching initial user profile values for name,skills, projects, etc.
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
                    setTempSkills(responseData.skills);
                    setTempLanguages(responseData.languages);
                    setInputAboutValue(responseData.description);
                    setnewinputval(responseData.description);
                    setProjects(responseData.work_sample_urls ? responseData.work_sample_urls : []);
                    setPortfolios(responseData.portfolio_urls ? responseData.portfolio_urls : []);
                    setTopBoxEditMode(false);
                    setLeftBoxEditMode(false);
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
                skills: [...tempSkills],
                languages: [...tempLanguages],
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
                setTempSkills(responseData.skills || []);
                setTempLanguages(responseData.languages || []);
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

    // updating about and projects
    const updateProjectsAndAbout = async () => {
        try {
            const response = await axios.patch('http://35.154.4.80/api/v0/users/me', {
                description: newinputval,
                work_sample_urls: [...projects, ...tempProjects],
                portfolio_urls: [...portfolios, ...tempPortfolios],
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
                setInputAboutValue(responseData.description);
                setnewinputval(responseData.description);
                setProjects(responseData.work_sample_urls || []);
                setPortfolios(responseData.portfolio_urls || []);
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

    //for skills and languages
    const handleSaveLeft = async () => {
        setLeftBoxEditMode(false);
        await updateSkillsAndLanguages();
        setNewSkill('');
        setNewLanguage('');
        setLeftButtonImage(require('../assets/edit.jpg'));
    };

    const handleCancelLeft = () => {
        setLeftBoxEditMode(false);
        setNewSkill('');
        setNewLanguage('');
        setTempSkills(skills);
        setTempLanguages(languages);
        setLeftButtonImage(require('../assets/edit.jpg'));
    };

    //for about and projects
    const handleSaveRight = async () => {
        setRightBoxEditMode(false);
        await updateProjectsAndAbout();
        // setProjects([...projects, ...tempProjects, newProject]); // Add the new project
        setNewProject('');
        setTempProjects([]); 
        setNewPortfolio('');
        setTempPortfolios([]);
        setRightButtonImage(require('../assets/edit.jpg'));
    };

    const handleCancelRight = () => {
        setRightBoxEditMode(false);
        // setNewProject('');
        // setTempProjects([]);
        // setNewPortfolio('');
        // setTempPortfolios([]);
        setnewinputval(inputAboutValue)
        setRightButtonImage(require('../assets/edit.jpg'));
    };

    

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
            <Header1 />

            {/* second div for profile bg */}
            <div className='profilepage'>
                <div className='firstcompprofile'>
                    <button className='switch-to-employer-button' onClick={switchToEmployerClick}>SWITCH TO AN EMPLOYER</button>

                    <div style={{ position: 'relative' }}>
                        <img src={require('../assets/profileBg.png')} alt="" className='profile-background-image' />
                        <div style={{
                            position: 'absolute',
                            top: '5%',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '94%',
                            left: '3%',
                            gap: '100px'
                        }} className='profiletosec-2' >
                            <div>
                                <button className='edit-button'
                                    style={{ backgroundImage: `url('${topButtonImage}')` }}
                                    onClick={() => handleEditClick('top')}>
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} className='profilesec-1'>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }} className='profilesec-4'>
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
                                            <div>
                                                <p style={{ fontSize: '32px', fontWeight: '700' }} className='text-1'>{savedName}</p>
                                                <p style={{ fontSize: '18px',marginTop:'3px' }} className='text-2'><MdWorkOutline style={{marginRight:'5px'}}/>{savedJobCategory}</p>
                                                <p style={{ fontSize: '18px',marginTop:'3px' }} className='text-2'><CiLocationOn style={{marginRight:'5px'}}/>{savedLocation}</p>
                                            </div>
                                        )}
                                        {topBoxEditMode && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '5px',
                                                marginBottom:'10px'
                                            }}>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        value={newName}
                                                        onChange={(e) => setNewName(e.target.value)}
                                                        className='profilesecinputs'
                                                        style={{ padding: '10px', width: '190px', borderRadius: '16px', border: '1px solid #DDD' }}
                                                    />
                                                </div>
                                                <div>
                                                    <select
                                                        className='profilesecinputs'
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
                                                        className='profilesecinputs'
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
                                            <div className='profiletopinfo' style={{
                                                padding: '5px', background: 'white',
                                                width: '150px', height: '70px', borderRadius: '15px', border: '1px solid black',
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <span style={{ color: '#ED8336', fontSize: '20px' }}> {jobsCompletedCount}</span>
                                                <span>Projects Completed</span>
                                            </div>
                                            <div className='profiletopinfo' style={{
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
                        <div className='skills' style={{ display: 'flex', flexDirection: 'column'}}>
                            <div style={{ display: 'flex', justifyContent:'space-between',alignItems:'center',gap:'10px' }}>
                                <h2 style={{paddingTop:'20px',fontSize:'28px'}} className='profilesec-subheading'>Skills</h2>
                                <button
                                    className='edit-button-three'
                                    style={{ backgroundImage: `url('${leftButtonImage}')` }}
                                    onClick={() => handleEditClick('left')}
                                ></button>
                            </div>

                            {/* Display newly added skills */}
                            {!leftBoxEditMode && (
                            <ul style={{listStyle: 'none',gap:'7px',display:'flex' ,flexDirection:'column',marginTop:'12px'}}>
                                {skills.map((skill, index) => (
                                        <li key={index} className='li-li' style={{ textTransform:'capitalize',color: 'black',backgroundColor:'#E9E9E9', padding: '7px 40px 7px 12px',borderRadius:'16px',fontSize:'18px',width:'fit-content',fontWeight:'500',cursor:'default' }}>{skill}</li>
                                ))}
                            </ul>
                            )}

                            {leftBoxEditMode && (
                                <div style={{ marginTop: '12px' }}>
                                    <div style={{gap:'7px',display:'flex' ,flexDirection:'column',marginBottom:'7px'}}>
                                            {tempSkills.map((skill, index) => (
                                                    <div key={index} className='li-li1' style={{ textTransform:'capitalize',color: 'black',backgroundColor:'#E9E9E9', padding: '7px 12px 7px 12px',borderRadius:'16px',fontSize:'18px',width:'fit-content',fontWeight:'500',cursor:'default',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:'50px' }}>
                                                        <p>{skill}</p>
                                                        <button onClick={() => handleDeleteSkill(index)} 
                                                        style={{color:'#000',cursor:'pointer',fontSize:'22px',backgroundColor:'transparent',border:'none',outline:'none'}}>×</button>
                                                    </div>
                                            ))}
                                    </div>
                                    <input
                                        style={{borderRadius:'16px',border:'1px solid #9c9b9b',padding:'10px'}}
                                        type="text"
                                        placeholder="Add new skill"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                    />
                                    <button style={{marginLeft:'10px',padding:'5px 10px',borderRadius:'5px',border:'none',fontSize:'22px',cursor:'pointer'}} onClick={handleAddSkill}>+</button>
                                </div>
                            )}


                        </div>

                        <div className='languages'>
                            <h2 style={{fontSize:'28px'}} className='profilesec-subheading'>Languages</h2>
                            
                            {/* Display newly added languages */}
                            {!leftBoxEditMode && (
                            <ul style={{listStyle: 'none',gap:'7px',display:'flex' ,flexDirection:'column',marginTop:'12px'}}>
                                {languages.map((language, index) => (
                                        <li key={index} className='li-li' style={{textTransform:'capitalize', color: 'black',backgroundColor:'#E9E9E9', padding: '7px 40px 7px 12px',borderRadius:'16px',fontSize:'18px',width:'fit-content',fontWeight:'500' }}>{language}</li>
                                ))}
                            </ul>
                             )}
                            {leftBoxEditMode && (
                                <div style={{ marginTop: '7px' }}>
                                    <div style={{gap:'7px',display:'flex' ,flexDirection:'column',marginBottom:'7px'}}>
                                            {tempLanguages.map((language, index) => (
                                                    <div key={index} className='li-li1' style={{ textTransform:'capitalize',color: 'black',backgroundColor:'#E9E9E9', padding: '7px 12px 7px 12px',borderRadius:'16px',fontSize:'18px',width:'fit-content',fontWeight:'500',cursor:'default',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:'50px' }}>
                                                        <p>{language}</p>
                                                        <button onClick={() => handleDeleteLanguage(index)} 
                                                        style={{color:'#000',cursor:'pointer',fontSize:'22px',backgroundColor:'transparent',border:'none',outline:'none'}}>×</button>
                                                    </div>
                                            ))}
                                    </div>
                                    <input
                                        style={{borderRadius:'16px',border:'1px solid #9c9b9b',padding:'10px'}}
                                        type="text"
                                        placeholder="Add new language"
                                        value={newLanguage}
                                        onChange={(e) => setNewLanguage(e.target.value)}
                                    />
                                    <button style={{marginLeft:'10px',padding:'5px 10px',borderRadius:'5px',border:'none',fontSize:'22px',cursor:'pointer'}} onClick={handleAddLanguage}>+</button>
                                </div>
                            )}

                        </div>

                        {leftBoxEditMode && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap:'8px' }} className='left-box-butcont'>
                                <div >
                                    <button className='save-button' onClick={handleSaveLeft}>Save</button>
                                </div>
                                <div >
                                    <button className='cancel-button' onClick={handleCancelLeft}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* div for about and projects */}
                    <div className='right-box'>
                        <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between' }}>
                            <h2 style={{paddingTop:'20px',fontSize:'28px',marginLeft:'20px'}} className='profilesec-subheading'>About</h2>
                            <button
                                className='edit-button-three'
                                style={{ backgroundImage: `url('${rightButtonImage}') ` }}
                                onClick={() => handleEditClick('right')}
                            ></button>
                        </div>
                        <textarea
                            type="text"
                            placeholder="Write something about you....."
                            value={newinputval}
                            onChange={handleAboutChange}
                            className={`about-box ${rightBoxEditMode ? 'editable' : ''}`}
                            readOnly={!rightBoxEditMode}
                            rows="3"
                            ref={(textarea) => textarea && updateTextareaHeight(textarea)}
                        />
                        <div style={{width:'90%',marginLeft:'20px'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginTop:'30px'}} >
                            <h2 style={{fontSize:'28px'}} className='profilesec-subheading'>Ongoing Work/Portfolio</h2>
                            <a href="#" style={{ marginLeft: 'auto', color: '#ED8335', fontWeight: 'bold' }}>Manage Projects</a>
                        </div>

                        <Box sx={{ marginTop:'25px',marginBottom:'45px',display:'flex',flexDirection:'row',gap:'15px',flexWrap:'wrap'}}>
                            {filters.map((filter, index) => (
                                <Chip key={index} label={filter} variant="outlined" sx={{width:'150px',border: '0.8px solid #000000',color:'#000',padding:'5.6px 13.6px 5.6px 13.6px',borderRadius:'12.8px'}}/>
                            ))}
                        </Box>

                        {rightBoxEditMode && (
                            <div className="box-container">
                                <input
                                    style={{padding:'12px 18px',borderRadius:'15px',border:'1px solid #9c9b9b'}}
                                    type="text"
                                    placeholder="Add ongoing work"
                                    value={newProject}
                                    onChange={(e) => setNewProject(e.target.value)}
                                />
                                <button style={{height:'20px',width:'20px',marginLeft:'10px',marginTop:'10px'}} onClick={handleAddProject}>+</button>
                            </div>
                        )}


                        <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                            {/* Displaying the projects */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px',gap:'20px'}}>
                                {projects.map((project, index) => (
                                    <div style={{
                                         minWidth: '150px', height: '150px', boxShadow: '0px 0px 4px 0px #00000040 ',
                                        borderRadius: '16px'
                                    }}>
                                        <div key={index} style={{ margin:'105px 12px 12px' }}>
                                            <div className="portfolio" style={{
                                                textAlign: 'center',
                                                lineHeight: '30px',
                                                color: 'white', backgroundColor: '#B27EE3', borderRadius: '16px'
                                                , fontWeight: 'bold', padding:'0 12px'
                                            }}>
                                                {project}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Margin between projects and portfolios */}
                            <div />

                            {rightBoxEditMode && (
                                <div className="box-container">
                                    <input
                                        style={{padding:'12px 18px',borderRadius:'16px',border:'1px solid #9c9b9b'}}
                                        type="text"
                                        placeholder="Add ongoing portfolio"
                                        value={newPortfolio}
                                        onChange={(e) => setNewPortfolio(e.target.value)}
                                    />
                                    <button style={{height:'20px',width:'20px',marginLeft:'10px',marginTop:'10px'}} onClick={handleAddPortfolio}>+</button>
                                </div>
                            )}

                            {/* Displaying the portfolio values */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px',gap:'20px' }}>
                                {portfolios.map((portfolio, index) => (
                                    <div style={{
                                        minWidth: '150px', height: '150px', boxShadow: '0px 0px 4px 0px #00000040 ',
                                        borderRadius: '16px',margin: '10px 0'
                                    }}>
                                        <div key={index} style={{ margin:'105px 12px 12px' }}>
                                            <div className="portfolio" style={{
                                                textAlign: 'center',
                                                lineHeight: '30px',
                                                color: 'white', backgroundColor: '#B27EE3', borderRadius: '16px'
                                                , fontWeight: 'bold', padding:'0 12px'
                                            }}>
                                                {portfolio}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>


                        {rightBoxEditMode && (
                            <div>
                                <div className="buttons-container">
                                    <div >
                                        <button className='cancel-button' onClick={handleCancelRight}>Cancel </button>
                                    </div>
                                    <div >
                                        <button className='save-button' onClick={handleSaveRight}>Save</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                </div>

                {/* foruth div for reviews */}
                <div className='review-box'>
                    <h2 style={{fontSize:'28px'}} className='profilesec-subheading'>Reviews</h2>
                </div>
            </div>
        </div>
    )
};
export default FreelancerProfile;
