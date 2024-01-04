import React, { useRef, useState, useEffect } from 'react';
import '../styles/Postjob.css';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faTimes } from '@fortawesome/free-solid-svg-icons';


const PostJob = () => {

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
        console.log(`Performing search for: ${query}`);
        // or implement additional logic here, such as fetching search results or updating the UI.
    };

    const JobCategoryOptions = [
        { value: 'Graphic Designer', label: 'Graphic Designer' },
        { value: 'Illustrator', label: 'Illustrator' },
        { value: 'Programmer', label: 'Programmer' },
        { value: 'Video Editor', label: 'Video Editor' },
        { value: '3D Artist', label: '3D Artist' },
        { value: 'Product Designer', label: 'Product Designer' },
    ];

    const LocationOptions = [
        { value: 'India', label: 'India' },
        { value: 'USA', label: 'USA' },
        { value: 'Canada', label: 'Canada' },
        { value: 'England', label: 'England' },
        { value: 'China', label: 'China' },
        { value: 'Russia', label: 'Russia' }
    ];

    const DurationOptions = [

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
        { value: 'India', label: 'INR' },
        { value: 'USA', label: 'USD' },
        { value: 'Canada', label: 'CAD' },
        { value: 'England', label: 'GBP' },
        { value: 'China', label: 'CNY' },
        { value: 'Russia', label: 'RUB' },
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


    const handleCancelClick = () => {
        navigate('/employerprofile');
    }
    const handleSaveClick = () => {
        navigate('/employerprofile');
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
                        <Form.Group className='form-group' style={{ flex: '1' }} controlId="formBasicTitle">
                            <h4>Title</h4>
                            <Form.Control style={{ width: '510px' }} className='form-vals' type="text" name='Title' placeholder="Title" />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formJobCategory">
                            <h4>Job Category</h4>
                            <Select
                                options={JobCategoryOptions} placeholder="Select"
                                styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '510px', height: '2px' }) }}
                            />
                        </Form.Group>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Form.Group className="mb-3 form-group" controlId="formLocation">
                                <h4>Location</h4>
                                <Select
                                    options={LocationOptions} placeholder="Select"
                                    styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '250px', height: '2px' }) }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 form-group" controlId="formDuration">
                                <h4>Duration</h4>
                                <Select
                                    options={DurationOptions} placeholder="Select"
                                    styles={{ control: (provided) => ({ ...provided, borderRadius: '10px', width: '250px', height: '2px' }) }}
                                />
                            </Form.Group>
                        </div>


                        <div>
                            <h4>Budget</h4>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Form.Group className="mb-3 form-group" controlId="formBudget">
                                <Form.Control style={{ width: '180px', height: '33px' }} className='form-vals-two' type="text" name='budget' placeholder="" />
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
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3 form-group" controlId="formJobDescription">
                            <h4>Job Description</h4>
                            <Form.Control style={{ height: '150px' }} className='form-vals-two' type="text" name='description' placeholder="Type Here..." />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formSkills">
                            <h4>Add Skills</h4>
                            <Form.Control className='form-vals-two' type="text" name='skills' placeholder="Type Here..." />
                        </Form.Group>

                        <h4>Reference files</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="Upload here"
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

                            {/* to remove the uploaded file using a cross button */}
                            {/* {selectedFile && (
                                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <p>Selected File: {selectedFile.name}</p>
                                    <button type="button" onClick={handleRemoveFile}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            )} */}

                        </div>

                        <Form.Group className="mb-3 form-group" controlId="formCompanyName">
                            <h4>Company Name (Optional)</h4>
                            <Form.Control className='form-vals-two' type="text" name='company name' placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group" controlId="formAboutCompany">
                            <h4>About Company (Optional)</h4>
                            <Form.Control style={{ height: '150px' }} className='form-vals-two' type="text" name='about company' placeholder="Type Here..." />
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