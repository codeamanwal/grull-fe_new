import React,{useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BAPI from '../helper/variable';
import '../styles/freelancerhome.css';
import axios from 'axios'
import ClientJob from './ClientJob';

export default function ClientHome() {
    const accessToken = localStorage.getItem('accessToken');
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
    const navigate=useNavigate();
    const clickpostjobs =()=>{
      navigate('/postjob')
    }
    const [firstname,setFirstname]=useState('');
    const [walletbalance,setwalletbalance]=useState('')
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
    
    const [jobData,setJobdata]=useState([]);
    useEffect (()=>{
      const getjobs=async()=>{
         try{
           const response = await axios.get(`${BAPI}/api/v0/users/me/jobs`, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${accessToken}`,
                 },
                 params: {
                   status:"ONGOING,COMPLETED"
                 },
             });
             console.log(response.data);
             if (response.status===200) {
                 console.log('Jobs Fetchedd successfully');
                 setJobdata(response.data.results);
             }
         }
         catch (error) {
           console.error('Error occurred:', error);
       }
      }
      getjobs();
   },[]);

  return (
    <Box sx={{padding:'90px 90px 70px'}} className='home-container'>
       <Box>
         <Typography sx={{fontSize:'32px',fontWeight:'600',letterSpacing:'-1px'}} className='home-heading'>Welcome, {firstname}</Typography>
         <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '10px'}} className='home-container-grid'>
            <Box sx={{ backgroundColor: '#B27EE31A', padding: '25px 30px',borderRadius:'16px',display:'flex',flexDirection:'column',gap:'7px' }}>
                <Typography sx={{color:"#000",fontSize:'22px'}} className='home-subheading'>Post your next job</Typography>
                <Typography sx={{color:"#656565",fontSize:'20px'}} className='home-content'>Explore exclusive freelancers.</Typography>
                <Button sx={{width:'fit-content',boxShadow:' 0px 0px 4px 0px #00000040',backgroundColor:'#fff',borderRadius:'16px',padding:'8px 20px',color:'#000',textTransform:'none',marginTop:'10px'}} onClick={clickpostjobs}>Post Jobs</Button>
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
                <Button sx={{width:'fit-content',boxShadow:' 0px 0px 4px 0px #00000040',backgroundColor:'#B27EE3',borderRadius:'16px',padding:'10px 30px',color:'#fff',textTransform:'none',marginTop:'10px',':hover':{backgroundColor:'#B27EE3'}}}>Add Balance</Button>
            </Box>
         </Grid>
       </Box>

       <Box sx={{marginTop:windowWidth>=600?'80px':'50px'}}>
         <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'32px',fontWeight:'600',letterSpacing:'-1px'}} className='home-heading'>Ongoing Jobs</Typography>
                <Link style={{color:'#ED8335',marginLeft:'10px'}} to='/clientmanagejobs/ongoing'>View All</Link>
         </Box>
         <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '10px', }} className='home-container-grid'>
           {jobData.filter((job) => ['ONGOING'].includes(job.status)).length === 0 ? (
                        <Typography sx={{ fontSize: '18px', padding: '20px', textAlign: 'center' }}>No ongoing jobs found.</Typography>
                      ) : (
                        jobData
                          .filter((job) => ['ONGOING'].includes(job.status))
                          .map((job, index) => (
                            <ClientJob
                              passed_from={1}
                              key={index}
                              id={job.id}
                              title={job.title}
                              companyLogoUrl={job.companyLogoUrl}
                              companyName={job.company_name}
                              postedDate={job.created_at}
                              isLast={index === jobData.length - 1}
                              applicantcount={job.applicants}
                              status={job.status}
                              total_deliverables={job.total_deliverables}
                              completed_deliverables={job.completed_deliverable}
                            />
                          ))
                      )}    
         </Grid>
       </Box>

       <Box sx={{marginTop:windowWidth>=600?'80px':'50px'}}>
         <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Typography sx={{fontSize:'32px',fontWeight:'600',letterSpacing:'-1px'}} className='home-heading'>Completed Jobs</Typography>
                <Link style={{color:'#ED8335',marginLeft:'10px'}} to='/clientmanagejobs/completed'>View All</Link>
         </Box>
         <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '10px', }} className='home-container-grid'>
              No Completed Jobs yet.
            {/* <Box sx={{ backgroundColor: '#B27EE31A', padding: '20px 30px 35px',borderRadius:'16px',display:'flex',flexDirection:'row',}}>
                <Box sx={{display:'flex',alignItems:'center'}}>
                    <img style={{width:'50px',height:'50px'}} alt="elula"
                    src="https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0"/>
                </Box>
                <Box sx={{paddingLeft:'20px',display:'flex',flexDirection:'column',gap:'2px'}}>
                    <Typography sx={{color:"#000",fontSize:'22px'}} className='home-subheading'>UI/UX Designer</Typography>
                    <Typography sx={{color:"#656565",fontSize:'18px'}} className='home-content'>Elula Tech Pvt Ltd</Typography>
                    <Typography sx={{color:"#656565",fontSize:'18px'}} className='home-content'>Bengaluru, Karnataka</Typography>
                    <Typography sx={{color:"#656565",fontSize:'15px'}} className='home-content'>Completed on Tue</Typography>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: '#B27EE31A', padding: '20px 30px 35px',borderRadius:'16px',display:'flex',flexDirection:'row',}}>
                <Box sx={{display:'flex',alignItems:'center'}}>
                    <img style={{width:'50px',height:'50px'}} alt="elula"
                    src="https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0"/>
                </Box>
                <Box sx={{paddingLeft:'20px',display:'flex',flexDirection:'column',gap:'2px'}}>
                    <Typography sx={{color:"#000",fontSize:'20px'}} className='home-subheading'>UI/UX Designer</Typography>
                    <Typography sx={{color:"#656565",fontSize:'17px'}} className='home-content'>Elula Tech Pvt Ltd</Typography>
                    <Typography sx={{color:"#656565",fontSize:'17px'}} className='home-content'>Bengaluru, Karnataka</Typography>
                    <Typography sx={{color:"#656565",fontSize:'15px'}} className='home-content'>Completed on Tue</Typography>
                </Box>
            </Box> */}
         </Grid>
       </Box>
    </Box>
  )
}
