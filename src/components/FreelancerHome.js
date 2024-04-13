import React,{useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { HiDotsVertical } from "react-icons/hi";
import Slider from '@mui/material/Slider';
import '../styles/freelancerhome.css';
import BAPI from '../helper/variable';
import axios from 'axios';
import Job from './Job';

export default function FreelancerHome() {
    
    const navigate=useNavigate();
    const [availability, setAvailability] = useState('available');
    const handleChange = (event) => {
        setAvailability(event.target.value);
    };
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const clickCompleteProfile=()=>{
        navigate('/freelancerprofile');
      }

      const clickDiscoverJobs=()=>{
        navigate('/browsejobs');
      }
    const [firstname,setFirstname]=useState('');
    const [walletbalance,setwalletbalance]=useState('')
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
      const infofetch = async () => {
          try {
              const response = await fetch(
                  `${BAPI}/api/v0/users/me`,
                  {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
                    },
                  }
                );
              const responseData = await response.json();
              setFirstname(responseData?.first_name);
              setwalletbalance(responseData?.wallet_balance);
          } catch (error) {
              console.error("Error fetching user information:", error);
          }
      }
      infofetch();
  }, []);

  const [applications, setApplications] = useState([]);
  const [jobData, setJobs] = useState([]);

  useEffect(() => {
    const getApplications = async (page = 1) => {
      try {
        const response = await axios.get(`${BAPI}/api/v0/users/me/job-applications`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          params: {
            page: page,
            per_page: 8,
          },
        });

        if (response.status === 200) {
        const acceptedApplications = response.data.results.filter(application =>
            application.status === "ACCEPTED"
        );
        const completedApplications = response.data.results.filter(application =>
            application.status === "COMPLETED"
        );

        const latestAccepted = acceptedApplications.slice(0, 2);
        const latestCompleted = completedApplications.slice(0, 2);

        const latestApplications = [...latestAccepted, ...latestCompleted];
        setApplications(latestApplications);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    getApplications();
  }, [accessToken]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jobDetails = await getJobDetails(applications);
      setJobs(jobDetails);
    };
    fetchJobDetails();
  }, [applications]);

  const getJobDetails = async (applications) => {
    try {
      const jobDetailsPromises = applications.map(async (application) => {
        const response = await axios.get(`${BAPI}/api/v0/jobs/${application.job_id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        response.data['applied_on']=application.modified_at;
        return response.data;
      });

      return Promise.all(jobDetailsPromises);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <Box sx={{padding:'90px 90px 70px'}} className='home-container'>
       <Box>
         <Typography sx={{fontSize:'32px',fontWeight:'600',letterSpacing:'-1px'}} className='home-heading'>Welcome, {firstname}</Typography>
         <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '10px'}} className='home-container-grid'>
            <Box sx={{ backgroundColor: '#B27EE31A', padding: '25px 30px',borderRadius:'16px',display:'flex',flexDirection:'column',gap:'7px' }}>
                <Typography sx={{color:"#000",fontSize:'22px'}} className='home-subheading'>Build profile</Typography>
                <Typography sx={{color:"#656565",fontSize:'20px'}} className='home-content'>Get access to more features</Typography>
                <Button sx={{width:'fit-content',boxShadow:' 0px 0px 4px 0px #00000040',backgroundColor:'#fff',borderRadius:'16px',padding:'8px 20px',color:'#000',textTransform:'none',marginTop:'10px'}} onClick={clickCompleteProfile}>Complete Profile</Button>
            </Box>
            <Box sx={{ backgroundColor: '#B27EE31A', padding: '25px 30px',borderRadius:'16px',display:'flex',flexDirection:'column',gap:'7px' }}>
                <Typography sx={{color:"#000",fontSize:'22px'}} className='home-subheading'>Find your next job</Typography>
                <Typography sx={{color:"#656565",fontSize:'20px'}} className='home-content'>Explore exclusive opportunities.</Typography>
                <Button sx={{width:'fit-content',boxShadow:' 0px 0px 4px 0px #00000040',backgroundColor:'#fff',borderRadius:'16px',padding:'8px 20px',color:'#000',textTransform:'none',marginTop:'10px'}} onClick={clickDiscoverJobs}>Discover Jobs</Button>
            </Box>
         </Grid>
       </Box>

       <Box sx={{marginTop:windowWidth>=600?'35px':'25px'}}>
         <Typography sx={{fontSize:'32px',fontWeight:'600',letterSpacing:'-1px'}} className='home-heading'>Availability</Typography>
         <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '10px', }} className='home-container-grid'>
            <Box sx={{ backgroundColor: '#B27EE31A', padding: '25px 30px',borderRadius:'16px' }}>
              <FormControl component="fieldset">
                <RadioGroup
                    aria-label="availability"
                    name="availability"
                    value={availability}
                    onChange={handleChange}
                    column
                >
                    <FormControlLabel value="available" control={<Radio style={{ color: availability ==='available' ?'#47D487':'#000' }}/>} label="Available" />
                    <FormControlLabel value="unavailable" control={<Radio style={{ color: availability ==='unavailable' ?'#47D487':'#000'  }}/>} label="Unavaible" />
                </RadioGroup>
              </FormControl>
            </Box>
         </Grid>
       </Box>

       <Box sx={{marginTop:windowWidth>=600?'40px':'25px'}}>
         <Typography sx={{fontSize:'32px',fontWeight:'600',letterSpacing:'-1px'}} className='home-heading'>Wallet</Typography>
         <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '10px', }} className='home-container-grid'>
            <Box sx={{ backgroundColor: '#B27EE31A', padding: '25px 30px',borderRadius:'16px',display:'flex',flexDirection:'column',gap:'7px',alignItems:'center' }}>
                <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                   <Typography sx={{color:"#000",fontSize:'25px',fontWeight:'800',}} className='home-subheading'>₹{walletbalance}</Typography>
                   <Link style={{color:'#B27EE3',marginLeft:'10px'}}>Hide Balance</Link>
                </Box>
                <Typography sx={{color:"#656565",fontSize:'20px'}} className='home-subheading'>Current Balance</Typography>
                <Button sx={{width:'fit-content',boxShadow:' 0px 0px 4px 0px #00000040',backgroundColor:'#B27EE3',borderRadius:'16px',padding:'10px 30px',color:'#fff',textTransform:'none',marginTop:'10px',':hover':{backgroundColor:'#B27EE3'}}}>Withdraw Balance</Button>
            </Box>
         </Grid>
       </Box>

       <Box sx={{marginTop:windowWidth>=600?'80px':'50px'}}>
         <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'32px',fontWeight:'600',letterSpacing:'-1px'}} className='home-heading'>Ongoing Jobs</Typography>
                <Link style={{color:'#ED8335',marginLeft:'10px'}} to='/managejobs/ongoing'>View All</Link>
         </Box>
         <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '10px', }} className='home-container-grid'>
            {jobData.filter(job => job.status === 'ONGOING').length > 0 ? (
                  jobData
                  .filter((job) => ['ONGOING'].includes(job.status))
                  .map((job, index) => (
                    <Job
                      passed_from={1}
                      key={index}
                      position={job.title}
                      companyName={job.company_name}
                      companyLogoUrl={job.companyLogoUrl}
                      location={job.location}
                      startDate={job.applied_on}
                      isLast={index === jobData.length - 1}
                      status={job.status}
                      job_id={job.id}
                      total_deliverables={job.total_deliverables}
                      completed_deliverables={job.completed_deliverable}
                    />
                  ))
                  ) : (
                      <p >No Ongoing Jobs yet</p>
                  )}
         </Grid>
       </Box>

       <Box sx={{marginTop:windowWidth>=600?'80px':'50px'}}>
         <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'32px',fontWeight:'600',letterSpacing:'-1px'}} className='home-heading'>Completed Jobs</Typography>
                <Link style={{color:'#ED8335',marginLeft:'10px'}} to='/managejobs/completed'>View All</Link>
         </Box>
         <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '10px', }} className='home-container-grid'>
         {jobData.filter(job => job.status === 'COMPLETED').length > 0 ? (
                  jobData
                  .filter((job) => ['COMPLETED'].includes(job.status))
                  .map((job, index) => (
                    <Job
                      passed_from={1}
                      key={index}
                      position={job.title}
                      companyName={job.company_name}
                      companyLogoUrl={job.companyLogoUrl}
                      location={job.location}
                      startDate={job.applied_on}
                      isLast={index === jobData.length - 1}
                      status={job.status}
                      job_id={job.id}
                      total_deliverables={job.total_deliverables}
                      completed_deliverables={job.completed_deliverable}
                    />
                  ))
                  ) : (
                      <p >No Completed Jobs yet</p>
                  )}
         </Grid>
       </Box>
    </Box>
  )
}
