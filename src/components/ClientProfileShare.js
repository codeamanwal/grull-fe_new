import React from 'react';
import '../styles/Freelancerprofile.css';
import '../styles/Employerprofile.css';
import { useNavigate,useParams} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { Box, Button, Typography} from '@mui/material';
import { CiLocationOn } from "react-icons/ci";
import { MdWorkOutline } from "react-icons/md";
import Header2 from './Header2';
import BAPI from '../helper/variable'
import Navbar from './Navbar';
const EmployerprofileShare = () => {
    const {userid}=useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const avatarBackgroundColor = 'Grey'; 
   
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


    const [inputAboutValue, setInputAboutValue] = useState('');
    const [inputcompdesc,setInputCompDesc]=useState('');
    const [newinputval,setnewinputval]= useState('');

    const handleAboutChange = (event) => {
        setnewinputval(event.target.value);
        updateTextareaHeight(event.target);
    };
    const handlecompdesc= (event) => {
        setInputCompDesc(event.target.value);
        updateTextareaHeight(event.target);
    };
    const updateTextareaHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
      };

    const [rightBoxEditMode, setRightBoxEditMode] = useState(false);
    const [topBoxEditMode, setTopBoxEditMode] = useState(false);

    const [newName, setNewName] = useState('');
    const [newJobCategory, setNewJobCategory] = useState('');
    const [newLocation, setNewLocation] = useState('');

    const [savedName, setSavedName] = useState('');
    const [savedJobCategory, setSavedJobCategory] = useState('');
    const [savedLocation, setSavedLocation] = useState('');

    const [jobsPostedCount, setJobsPostedCount] = useState('');
    const [avgRateOffered, setAvgRateOffered] = useState('');

    //giving initial values to the variables
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            
            const response = await axios.get(`${BAPI}/api/v0/users/public/${userid}`);
    
            if (response.status === 200) {
              const { full_name, role, location,jobs_posted_count,average_rate_offered,description } = response.data;
              console.log(response.data)
    
              setSavedName(full_name);
              setSavedJobCategory(role);
              if(location){
              setSavedLocation(location?.country);}
              else{
                setSavedLocation('Location Here')
              }
              setJobsPostedCount(jobs_posted_count);
              setAvgRateOffered(average_rate_offered);
              setInputAboutValue(description);
              setnewinputval(description);
            } else {
              console.error('Error fetching user profile:', response.data.error);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
        };
    
        fetchUserProfile();
      }, []);



    //view posted jobs
    const [postedJobs, setPostedJobs] = useState([]);
    const [weeksAgoMap, setWeeksAgoMap] = useState({});
    useEffect(() => {
        const fetchPostedJobs = async () => {
            try {
                const response = await axios.get(`${BAPI}/api/v0/users/me/jobs`, {
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

    return (
        <div style={{ overflowX: 'hidden' }}>
             <Navbar />
            {/* second div for profile bg */}
            <div className='profilepage'>
               <div className='firstcompprofile'>
                <div style={{ position: 'relative' }}>
                    <img src={require('../assets/profileBg.png')} alt="" className='profile-background-image'></img>

                     <div style={{
                        position: 'absolute',
                        top:'51%',
                        display:'flex',
                        flexDirection:'column',
                        width:'94%',
                        left:'3%',
                        gap:'100px'
                     }} className='profiletosec-2' >
                           <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} className='profilesec-1'>
                               <div style={{display:'flex',flexDirection:'row',gap:'30px',alignItems:'center'}} className='profilesec-4'>
                                    <div className='user-picture'>
                                        <Avatar
                                            className='user-picture-img'
                                            alt={savedName}
                                            style={{ backgroundColor: avatarBackgroundColor }}
                                        >
                                            {savedName?.split(' ').slice(0, 2).map(part => part[0]).join('')}
                                        </Avatar>
                                          
                                    </div>
                                <>
                                    {!topBoxEditMode && (
                                        <div>
                                            <p style={{ fontSize: '32px', fontWeight: '700' }} className='text-1'>{savedName}</p>
                                            <p style={{ fontSize: '18px',marginTop:'3px' }} className='text-2'><MdWorkOutline style={{marginRight:'5px'}}/>{savedJobCategory}</p>
                                            <p style={{ fontSize: '18px',marginTop:'3px' }} className='text-2'><CiLocationOn style={{marginRight:'5px'}}/>{savedLocation}</p>
                                        </div>
                                    )}
                                </>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',gap:'30px',alignItems:'center'}}>
                                    {!topBoxEditMode && (
                                            <div style={{
                                                display: 'flex',gap:'10px',flexDirection:'row'
                                            }}>
                                                <div className='profiletopinfo' style={{
                                                padding: '5px', background: 'white',
                                                width: '150px', height: '70px', borderRadius: '15px', border: '1px solid black',
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                    <span style={{ color: '#ED8336', fontSize: '20px' }}>{jobsPostedCount}</span>
                                                    <span>Jobs Posted</span>
                                                </div>
                                                <div className='profiletopinfo' style={{
                                                padding: '5px', background: 'white',
                                                width: '150px', height: '70px', borderRadius: '15px', border: '1px solid black',
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                    <span style={{ color: '#ED8336', fontSize: '20px' }}>${avgRateOffered}</span>
                                                    <span>Avg. Budget</span>
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

                    <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between' }}>
                        <h2 style={{fontSize:'28px',marginLeft:'20px' }} className='profilesec-subheading'>About</h2>
                       
                    </div>

                    <textarea
                            type="text"
                            placeholder="Write something about you....."
                            value={newinputval}
                            onChange={handleAboutChange}
                            className={`first-box-one ${rightBoxEditMode ? 'editable' : ''}`}
                            readOnly={!rightBoxEditMode}
                            rows="3"
                            ref={(textarea) => textarea && updateTextareaHeight(textarea)}
                        />
                        
                    <textarea
                        type="text"
                        placeholder=""
                        value={inputcompdesc}
                        onChange={handlecompdesc}
                        className={`first-box-two ${rightBoxEditMode ? 'editable' : ''}`}
                        readOnly={!rightBoxEditMode}
                        rows="2"
                        ref={(textarea) => textarea && updateTextareaHeight(textarea)}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginTop:'40px'}}>
                        <h2 style={{fontSize:'28px' }} className='profilesec-subheading'>Posted Jobs</h2>
                    </div>

                    { (
                        <div className='inside-posted-jobs'>
                            {postedJobs.map((job) => (
                                <Box key={job.job_id} sx={{ borderRadius: '16px', border: 'none',  padding: '16px 20px',boxShadow: '0px 0px 4px 0px #00000040',display:'flex',flexDirection:'column',gap:{xs:'6px',sm:'10px'}  }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ fontSize:{ xs:'18px',sm:'24px'}, fontWeight: '700', flex: '70%', margin: '0' }}>{job.title}</Typography>
                                        <Typography sx={{ fontSize: '15px', color: '#B27EE3', flex: '30%', margin: '0',display:{xs:'none',md:'block'} }}>{job.job_applicants_count} FREELANCERS APPLIED</Typography>
                                    </div>

                                    <div style={{  display: 'flex', alignItems: 'center',marginTop:'2px' }}>
                                        <Typography sx={{ fontSize:{ xs:'15px',sm:'19px'} ,fontWeight:'500'}}>Budget: $ {job.rate_per_hour}</Typography>
                                        <Typography sx={{ fontSize: '14px', color: '#00000080', marginLeft: '20px' }}>Posted {weeksAgoMap[job.job_id] !== undefined ? `${weeksAgoMap[job.job_id]} weeks` : 'loading...'} ago</Typography>
                                    </div>
                                    <Typography sx={{ fontSize:{xs:'12px',sm:'15px'}, color: '#B27EE3', flex: '30%', margin: '2px 0 0 0',display:{xs:'block',md:'none'} }}>{job.job_applicants_count} FREELANCERS APPLIED</Typography>
                                    <div style={{ display: 'flex', alignItems: 'center',gap:'7px',marginTop:'5px',flexWrap:'wrap' }}>
                                        {/* <p> {job.required_skills.join(', ')}</p> */}
                                        {job.required_skills.map((skill, index) => (
                                            <Box key={index} sx={{ backgroundColor: '#ED8335', color: 'white', borderRadius: '16px', padding:{ xs:'8px 12px',sm:'10px 15px'},fontSize:{xs:'13px',sm:'16px'} }}>
                                                {skill}
                                            </Box>
                                        ))}
                                    </div>
                                    <Box sx={{ borderRadius: '12px',boxShadow: '0px 0px 4px 0px #00000040', border: 'none',display: 'flex', alignItems: 'center',width:'fit-content',padding:{ xs:'9px 11px',sm:'10px 20px'},marginTop:{xs:'5px',sm:'3px'}}}>
                                        {job.status === 'PENDING' && (
                                            <Box sx={{ width:{xs:'9px',sm:'7px'}, height: {xs:'9px',sm:'7px'}, borderRadius: '50%', backgroundColor: 'orange', marginRight:{xs:'11px',sm:'15px'}}}></Box>
                                        )}
                                        {job.status === 'COMPLETED' && (
                                            <Box sx={{ width:{xs:'9px',sm:'7px'}, height: {xs:'9px',sm:'7px'}, borderRadius: '50%', backgroundColor: '#DA000D',marginRight:{xs:'11px',sm:'15px'}}}></Box>
                                        )}
                                        {job.status === 'ACTIVE' && (
                                            <Box sx={{ width:{xs:'9px',sm:'7px'}, height: {xs:'9px',sm:'7px'}, borderRadius: '50%', backgroundColor: '#2CAA00', marginRight:{xs:'11px',sm:'15px'}}}></Box>
                                        )}
                                        <Typography sx={{ fontSize:{ xs:'12px',sm:'16px',},color: '#4301A2'}}>{job.status}</Typography>
                                    </Box>

                                    {/* Display other job details as needed */}
                                </Box>
                            ))}
                        </div>
                    )}
                </div>
                <div className='review-box'>
                    <h2 style={{fontSize:'28px'}} className='profilesec-subheading'>Reviews</h2>
                    <p style={{marginTop:'10px'}}>You have no reviews yet.</p>
                </div>
            </div>

            {/* foruth div for reviews */}
            
        </div>
    )
};
export default EmployerprofileShare;