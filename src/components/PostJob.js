import React, { useRef, useState, useEffect } from 'react';
import '../styles/Postjob.css';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const PostJob = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const handleSkillsChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions.map(option => option.value));
    };
    const handleSaveClick = async () => {
        if (!accessToken) {
            // Handle the case where the accessToken is not available
            console.error('Access token not found in localStorage');
            // You might want to redirect the user to the login page or handle the situation accordingly
          } else {
            try {
            const title = document.querySelector('[name="Title"]').value;
            const category = document.querySelector('[name="Job_Category"]').value; 
            const location = document.querySelector('[name="Location"]').value; 
            const duration = document.querySelector('[name="Duration"]').value;
            const rate_per_hour = document.querySelector('[name="Budget"]').value;
            // const negotiableCheckbox = document.querySelector('[name="Negotiable"]');
            // const negotiable = negotiableCheckbox ? negotiableCheckbox.checked : false;
            const description = document.querySelector('[name="Job_Description"]').value;
            const required_skills=selectedSkills;
            // const referenceFilesInput = document.querySelector('[name="Reference_Files"]');
            // const referenceFiles = Array.from(referenceFilesInput.files).map(file => file.name);
            const company_name = document.querySelector('[name="Company_Name"]').value;
            const company_description = document.querySelector('[name="About_Company"]').value;
    
            const requestData = {
                "category": category,
                "company_description": company_description,
                "company_name": company_name,
                "description": description,
                "duration": duration,
                "location": location,
                "rate_per_hour": rate_per_hour,
                "required_skills": required_skills,
                "title": title,
            };
            console.log(requestData)
            const response = await axios.post('http://35.154.4.80/api/v0/jobs', requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
            console.log(response)
            if (response.status===200) {
                console.log('Job posted successfully');
                navigate('/employerprofile');
            } else {
                console.error('Error posting job:', response.data.error);
            }
    
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
    };
    
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

    const ClickBrowseFreelancers = () => {
        navigate('/browsefreelancer');
    }

    const handleImage2Click = () => {

    }

    const viewProfileClick = () => {
        navigate('/employerprofile');
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


    const handleSearch = (query) => {
        // Perform actions based on the search query
        // console.log(Performing search for: ${query});
        // or implement additional logic here, such as fetching search results or updating the UI.
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

    const DurationOptions = [
        { value: '30', label: '30 Days' },
        { value: '60', label: '60 Days' },
        { value: '3M', label: '3 Months' },
        { value: '6M', label: '6 Months' },
        { value: '1Y', label: '1 Year' },
    ];
    const CurrencyOptions = [
        { value: 'India', label: 'INR' },
        { value: 'USA', label: 'USD' },
        { value: 'Canada', label: 'CAD' },
        { value: 'England', label: 'GBP' },
        { value: 'China', label: 'CNY' },
        { value: 'Russia', label: 'RUB' },
    ];
    const SkillOptions = [
        { value: 'Reactjs', label:'Reactjs' },
        { value: 'Nodejs', label:'Nodejs' },
        { value: 'EXPjs', label:'EXPjs' },
        { value: 'DJANGO', label:'DJANGO' },
        { value: 'UI', label:'UI' },
        { value: 'UX', label:'UX' },
    ];
    
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        const validFiles = Array.from(files).filter((file) => file.type === 'application/pdf');

        if (validFiles.length > 0) {
            setSelectedFiles([...selectedFiles, ...validFiles]);
        } else {
            // Handle invalid file types or no files selected
            console.error('Invalid file types or no files selected');
        }
    };

    const handleRemoveFile = (fileToRemove) => {
        const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
        setSelectedFiles(updatedFiles);
    };

    const handleArrowClick = () => {
        fileInputRef.current.click();
    };


    const handleCancelClick = () => {
        navigate('/employerprofile');
    }

    return (
        <div>
            {/* div 1 for header */}
            <div className='headerStyle' style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginLeft: '80px', marginTop: '16px' }}>Grull</h2>

                <div className='buttonContainer'>
                    <button className='browse-jobs' onClick={ClickBrowseFreelancers}>Browse Freelancer &#9660;</button>
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
                        <div className='dropdown' style={{ width: '160px', height: '120px', marginTop: '20px', marginLeft: '20px', backgroundColor: 'white', border: '1px solid #9c9b9b', borderRadius: '20px' }}>
                            <ul style={{ textAlign: 'center' }}>
                                <li><NavLink to='/clientmanagejobs/posted' style={{ color: '#303030', display: 'block', textDecoration: 'none', padding: '2px' }}>Posted Jobs</NavLink></li>
                                <li><NavLink to='/clientmanagejobs/ongoing' style={{ color: '#303030', display: 'block', textDecoration: 'none', padding: '2px' }}>Ongoing Jobs</NavLink></li>
                                <li><NavLink to='/clientmanagejobs/completed' style={{ color: '#303030', display: 'block', textDecoration: 'none', padding: '2px' }}>Completed Jobs</NavLink></li>
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
            <div>

                {/* div 2 for making the input form */}
                <div className='input-form'>
                    <Form>
                        <h2>Job Description</h2>
                        <Form.Group className='form-group' controlId="formBasicTitle">
                            <h4>Title</h4>
                            <Form.Control style={{ width: '510px' }} className='form-val' type="text" name='Title' placeholder="Title" />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formJobCategory">
                            <h4>Job Category</h4>
                            <Select
                                options={JobCategoryOptions} placeholder="Select" name="Job_Category"
                                styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '510px', height: '2px' }) }}
                            />
                        </Form.Group>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Form.Group className="mb-3 form-group" controlId="formLocation">
                                <h4>Location</h4>
                                <Select
                                    options={LocationOptions} placeholder="Select" name="Location"
                                    styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '250px', height: '2px' }) }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 form-group" controlId="formDuration">
                                <h4>Duration</h4>
                                <Select
                                    options={DurationOptions} placeholder="Select" name="Duration"
                                    styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '250px', height: '2px' }) }}
                                />
                            </Form.Group>
                        </div>


                        <div>
                            <h4>Budget</h4>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Form.Group className="mb-3 form-group" controlId="formBudget">
                                <Form.Control style={{ width: '180px', height: '33px' }} className='form-vals-two' type="text" name="Budget" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3 form-group" controlId="formCurrency">
                                <Select
                                    options={CurrencyOptions} placeholder="Select"
                                    styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '180px', height: '2px' }) }}
                                />
                            </Form.Group>

                            <Form.Group className="form-group" controlId="formCheckbox" style={{}}>
                                <Form.Check
                                    type="checkbox"
                                    label="Negotiable"
                                    id="includeDurationCheckbox"
                                    name="Negotiable"
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3 form-group" controlId="formJobDescription">
                            <h4>Job Description</h4>
                            <Form.Control style={{ height: '150px' }} className='form-vals-two' type="text" name="Job_Description" placeholder="Type Here..." />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formSkills">
                            <h4>Add Skills</h4>
                            <Select
                                isMulti={true}
                                options={SkillOptions}
                                placeholder="Select"
                                name="Skills"
                                styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width:'500px', }) }}
                                onChange={(selectedOptions) => handleSkillsChange(selectedOptions)}
                            />

                        </Form.Group>

                        <h4>Reference files</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="Upload here"
                                    className="form-control"
                                    style={{ width: '500px', height: '30px', borderRadius: '12px', border: '1px solid #ddd' }}
                                />
                                <button onClick={handleArrowClick}>
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </button>
                            </div> */}

                           <input
                                name="Reference_Files"
                                type="file"
                                id="fileInput"
                                ref={fileInputRef}
                                accept=".pdf"
                                // style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />

                            {selectedFiles.length > 0 && (
                                <div>
                                    <p>Selected Files:</p>
                                    <ul>
                                        {selectedFiles.map((file, index) => (
                                            <li key={index} style={{fontSize:'12px',margin:0}}>
                                                {file.name}
                                                <button type="button" onClick={() => handleRemoveFile(file)}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <Form.Group className="mb-3 form-group" controlId="formCompanyName">
                            <h4>Company Name (Optional)</h4>
                            <Form.Control className='form-vals-two' type="text" name="Company_Name" placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formAboutCompany">
                            <h4>About Company (Optional)</h4>
                            <Form.Control style={{ height: '150px' }} className='form-vals-two' type="text" name="About_Company" placeholder="Type Here..." />
                        </Form.Group>
                    </Form>

                    <div style={{ marginTop: '70px', marginBottom: '50px' }}>
                        <button className='cancel-button' onClick={handleCancelClick}>Cancel</button>
                        <button className='save-button' onClick={handleSaveClick}>Save</button>
                    </div>
                </div>
            </div >
        </div >
    )
};

export default PostJob;