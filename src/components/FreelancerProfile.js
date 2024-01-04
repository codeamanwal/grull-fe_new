import React from 'react';
import '../styles/Freelancerprofile.css';
import { useNavigate,  NavLink} from 'react-router-dom';
import { useState, useRef, useEffect  } from 'react';


const FreelancerProfile = () => {

    const navigate = useNavigate();
    const handleImage1Click = () => {
        // logic for what will happen when clicked on messaging image
    }

    const handleImage2Click = () => {
        // logic for what will happen when clicked on notifications image
    }

    const viewProfileClick=()=>{
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
        navigate('/start');
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

    const handleSaveTop = () => {
        setTopBoxEditMode(false);
        setSavedName(newName);
        setSavedJobCategory(newJobCategory);
        setSavedLocation(newLocation);
        // setNewName('');
        // setNewJobCategory('');
        // setNewLocation('');
        setTopButtonImage(require('../assets/edit.jpg'));
    }

    const handleCancelTop = () => {
        setTopBoxEditMode(false);
        setNewName('');
        setNewJobCategory('');
        setNewLocation('');
        setTopButtonImage(require('../assets/edit.jpg'));
    }

    const handleCancel = () => {
        setLeftBoxEditMode(false);
        setNewSkill('');
        setNewLanguage('');
        setTempSkills([]); // Discard temporary skills
        setTempLanguages([]); // Discard temporary languages
        setLeftButtonImage(require('../assets/edit.jpg'));
    };

    const handleCancelAbout = () => {
        setRightBoxEditMode(false);
        setNewProject('');
        setTempProjects([]);
        setInputAboutValue('');
        setRightButtonImage(require('../assets/edit.jpg'));
    };

    const handleSave = () => {
        setLeftBoxEditMode(false);
        setSkills([...skills, ...tempSkills]); // Add temporary skills to main skills
        setLanguages([...languages, ...tempLanguages]); // Add temporary languages to main languages
        setNewSkill('');
        setNewLanguage('');
        setTempSkills([]); // Reset temporary skills
        setTempLanguages([]); // Reset temporary languages
        setLeftButtonImage(require('../assets/edit.jpg'));
    };

    const handleSaveAbout = () => {
        setRightBoxEditMode(false);
        setProjects([...projects, ...tempProjects, newProject]); // Add the new project
        setNewProject('');
        setTempProjects([]);   //Reset temp projects
        setRightButtonImage(require('../assets/edit.jpg'));
    };

    return (
        <div>

            {/* first div for header */}
            <div className='headerStyle' style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginLeft: '80px', marginTop: '16px' }}>Grull</h2>

                <div className='buttonContainer'>
                    <button className='findWorkButton'>Find Work</button>
                </div>

                <div className='buttonContainer'>
                    <button className='postProjectButton'>Post a Project</button>
                </div>

                <div className='buttonContainer'>
                    <button className='learnButton'>Learn</button>
                </div>
                <div className='buttonContainer'>
                    <button className='collaborateButton'>Collaborate</button>
                </div>
                <div className='imageContainer' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={require('../assets/FreelancerProfileHeaderMessage.jpg')} alt="" className='message' onClick={handleImage1Click} />
                    <img src={require('../assets/FreelancerProfileHeaderNotif.jpg')} alt="" className='notification' onClick={handleImage2Click} />

                    <div className='container' ref={container}>
                        <img src={require('../assets/FreelancerProfileHeaderProfile.jpg')} alt="" className='profile' onClick={clickProfileImage} />

                        {showDropdown.open && (
                            <div className='dropdown'>
                                <div className="user-info" style={{ display: 'flex', alignItems: 'center',marginTop:'10px', marginLeft:'10px'}}>
                                    <img src={require('../assets/FreelancerProfileHeaderProfile.jpg')} style={{ height: '80px', width: '80px', borderRadius: '50%' }} alt="User Profile" className="profile-image" />
                                    <div style={{ marginLeft: '30px' }}>
                                        <p style={{ margin: '0', fontSize: '18px', marginBottom: '2px',color:'black', fontWeight:'bold'}}>Name</p>
                                        <p style={{ margin: '0', fontSize: '16px', marginTop: '-2px',color:'black' }}>Job Category</p>
                                    </div>
                                </div>
                                <button style={{ backgroundColor:'white',cursor:'pointer',height: '38px',borderRadius:'20px',border:'1px solid #B27EE3', width:'280px', color: '#B27EE3',marginTop:'10px',marginLeft:'10px' }}
                                onClick={viewProfileClick}>View Profile</button>
                                <div style={{marginTop:'15px'}}>
                                    <NavLink style={{textDecoration:'none',color:'black'}} to="/">Dashboard</NavLink>
                                </div>
                                <div style={{marginTop:'8px'}}>
                                    <NavLink style={{textDecoration:'none',color:'black'}} to="/page2">Wallet</NavLink>
                                </div>
                                <div style={{marginTop:'8px'}}>
                                    <NavLink style={{textDecoration:'none',color:'black'}} to="/page3">Settings</NavLink>
                                </div>
                                <hr style={{marginTop:'15px'}}/>
                                <NavLink style={{textDecoration:'none',color:'black'}} to="/start">Logout</NavLink>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* second div for profile bg */}
            <div>
                <button className='switch-to-employer-button' onClick={switchToEmployerClick}>SWITCH TO AN EMPLOYER</button>

                <div style={{ position: 'relative' }}>
                    <img src={require('../assets/profileBg.png')} alt="" className='profile-background-image'></img>

                    {/* Display user details in overlay*/}
                    {!topBoxEditMode && (
                        <div style={{
                            position: 'absolute',
                            top: '70%',
                            left: '33%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            color: 'black',
                            fontWeight: 'bold',
                        }}>
                            <div style={{ fontSize: '24px' }}>{savedName}</div>
                            <div style={{ fontSize: '16px' }}>{savedJobCategory}</div>
                            <div style={{ fontSize: '16px' }}>{savedLocation}</div>
                        </div>
                    )}

                    {!topBoxEditMode && (
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '120px',
                            zIndex: '1',
                            display: 'flex',
                        }}>
                            <div style={{ marginRight: '20px', padding: '5px', background: 'white',
                            width:'150px',height: '70px',borderRadius: '15px',border: '1px solid black',
                            display:'flex', justifyContent:'center', alignItems:'center' }}>
                                <span>Projects Completed</span>
                            </div>
                            <div style={{ marginRight:'10px',padding: '5px', background: 'white', 
                          width:'150px', height: '70px', borderRadius: '15px',border: '1px solid black',textAlign:'center',
                          display:'flex', justifyContent:'center', alignItems:'center' }}>
                                <span>Per Hour</span>
                            </div>
                        </div>
                    )}
                    {topBoxEditMode && (
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '120px',
                            zIndex: '1',
                        }} className='edit-buttons-container'>
                            <div>
                                <button className='cancel-button' onClick={handleCancelTop}>Cancel</button>
                            </div>
                            <div>
                                <button className='save-button' onClick={handleSaveTop}>Save</button>
                            </div>
                        </div>
                    )}

                    {topBoxEditMode && (
                        <div style={{
                            position: 'absolute',
                            top: '70%',
                            left: '35%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    style={{ height: '20px', width: '180px', borderRadius: '15px', border: '1px solid #DDD' }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter your job category"
                                    value={newJobCategory}
                                    onChange={(e) => setNewJobCategory(e.target.value)}
                                    style={{ height: '20px', width: '180px', borderRadius: '15px', border: '1px solid #DDD' }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter your location"
                                    value={newLocation}
                                    onChange={(e) => setNewLocation(e.target.value)}
                                    style={{ height: '20px', width: '180px', borderRadius: '15px', border: '1px solid #DDD' }}
                                />
                            </div>
                        </div>
                    )}
                    <button className='edit-button'
                        style={{ backgroundImage: `url('${topButtonImage}')` }}
                        onClick={() => handleEditClick('top')}>
                    </button>
                </div>

                <div className='user-picture'>
                    <img className='user-picture-img' src={require('../assets/FreelancerProfileHeaderProfile.jpg')} alt=""></img>
                    <label htmlFor="fileInput" className='camera-icon-label'>
                        <img className='camera-icon' src={require('../assets/cameraIcon.jpg')} alt="Camera"></img>
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
                        <div>
                            {skills.concat(tempSkills).map((skill, index) => (
                                <div key={index}>{skill}</div>
                            ))}
                        </div>
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
                        {languages.concat(tempLanguages).map((language, index) => (
                            <div key={index}>{language}</div>
                        ))}
                    </div>

                    {leftBoxEditMode && (
                        <div >
                            <div>
                                <button className='save-button' onClick={handleSave}>Save</button>
                            </div>
                            <div>
                                <button className='cancel-button' onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className='right-box'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ marginLeft: '30px', flex: '1' }}>About</h2>
                        <button
                            className='edit-button-three'
                            style={{ backgroundImage: `url('${rightButtonImage}')` }}
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
                                    <button className='save-button' onClick={handleSaveAbout}>Save</button>
                                </div>
                                <div>
                                    <button className='cancel-button' onClick={handleCancelAbout}>Cancel</button>
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
    )
};
export default FreelancerProfile;

