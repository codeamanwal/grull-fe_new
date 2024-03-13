// ManageJobsPage.js
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link,useNavigate, useParams } from 'react-router-dom';
import '../styles/freelancermanagejobs.css';
import ClientJob from './ClientJob';
import axios from 'axios';
import Header3 from './Header3';
import BAPI from '../helper/variable'
const ClientManageJobs = () => {
  const { section } = useParams();
  const [selectedSection, setSection] = useState(section || 'applied');
  const navigate=useNavigate();
  const handleButtonClick=(selectedsection)=>{
         setSection(selectedsection);
         navigate(`/clientmanagejobs/${selectedsection}`)
  }
  useEffect(() => {
    if (section) {
      setSection(section);
    }
  }, [section]);

  const accessToken = localStorage.getItem('accessToken');
  const [jobData,setJobdata]=useState([]);
  useEffect (()=>{
    const getjobs=async()=>{
       try{
         const response = await axios.get(`${BAPI}/api/v0/users/me/jobs`, {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${accessToken}`,
               },
           });
           console.log(response.data.results);
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
 },[])
// const jobData = [
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Posted',
//     applicantcount:1
//   },
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Posted',
//     applicantcount:1
//   },
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Posted',
//     applicantcount:1
//   },
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Completed',
//     applicantcount:1
//   },
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Completed',
//     applicantcount:1
//   },
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Completed',
//     applicantcount:1
//   },
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Ongoing',
//     applicantcount:1
//   },
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Ongoing',
//     applicantcount:1
//   },
//   {
//     workdesc: 'UI/UX Designer',
//     companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
//     postedDate: '9/5/2023',
//     status: 'Ongoing',
//     applicantcount:1
//   },
// ];
  return (
    <Box>
      <Header3 />
<Box sx={{padding:'50px 90px'}} className='managejobs-page'>
         <Box>
           <Typography sx={{fontSize: '32px', fontWeight: 700, lineHeight: '38px', letterSpacing: '-1px',textAlign: 'left',  }} className='managejobs-title'>
              Manage Jobs
            </Typography>
         </Box>

         <Box sx={{marginTop:'50px',display:'flex',flexDirection:'row',width:'100%' }} className='managejobs'>
            <Box className='managejobs-opts managejobs-opts-client' sx={{boxShadow: '0px 0px 4px 1px #00000040',borderRadius:'16px',padding:'22px',display:'flex',flexDirection:'column',gap:'10px',alignSelf:'flex-start',marginTop:'160px'}}>
               <Button sx={{fontSize:'17px',backgroundColor:section==='posted'?'#d7d7d7':'#e3e3e3',color:section!=='posted'?'rgba(0,0,0,0.5)':'#000',borderRadius:'16px',padding:'9px 12px',textTransform:'none',':hover':{backgroundColor:section==='posted'?'#d7d7d7':'#e3e3e3',color:section!=='posted'?'rgba(0,0,0,0.5)':'#000',}}}
               onClick={()=>{handleButtonClick('posted')}}>Posted Jobs</Button>
               <Button sx={{fontSize:'17px',backgroundColor:section==='ongoing'?'#d7d7d7':'#e3e3e3',color:section!=='ongoing'?'rgba(0,0,0,0.5)':'#000',borderRadius:'16px',padding:'9px 12px',textTransform:'none',':hover':{backgroundColor:section==='ongoing'?'#d7d7d7':'#e3e3e3',color:section!=='ongoing'?'rgba(0,0,0,0.5)':'#000',}}}
               onClick={()=>{handleButtonClick('ongoing')}}>Ongoing Jobs</Button>
               <Button sx={{fontSize:'17px',backgroundColor:section==='completed'?'#d7d7d7':'#e3e3e3',color:section!=='completed'?'rgba(0,0,0,0.5)':'#000',borderRadius:'16px',padding:'9px 12px',textTransform:'none',':hover':{backgroundColor:section==='completed'?'#d7d7d7':'#e3e3e3',color:section!=='completed'?'rgba(0,0,0,0.5)':'#000',}}}
               onClick={()=>{handleButtonClick('completed')}}>Completed Jobs</Button>
            </Box>
            <Box sx={{  width: '850px',padding:'0 0px 0 90px' }} className='managejobs-display'>
               {selectedSection==='posted' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}} className='jobs-category'>Posted Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/employerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData.filter((job) => ['PENDING'].includes(job.status)).length === 0 ? (
                        <Typography sx={{ fontSize: '18px', padding: '20px', textAlign: 'center' }}>No pending jobs found.</Typography>
                      ) : (
                        jobData
                          .filter((job) => ['PENDING'].includes(job.status))
                          .map((job, index) => (
                            <ClientJob
                            key={index}
                            id={job.id}
                            title={job.title}
                            companyLogoUrl={job.companyLogoUrl}
                            postedDate={job.created_at}
                            isLast={index === jobData.length - 1}
                            applicantcount={job.job_applicants_count}
                            status={job.status}
                          />
                          ))
                      )} 
                    </Box>
                  </Box>
               )
               }
               {selectedSection==='completed' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography className='jobs-category' sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}}>Completed Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/employerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData.filter((job) => ['Completed'].includes(job.status)).length === 0 ? (
                        <Typography sx={{ fontSize: '18px', padding: '20px', textAlign: 'center' }}>No completed jobs found.</Typography>
                      ) : (
                        jobData
                          .filter((job) => ['Completed'].includes(job.status))
                          .map((job, index) => (
                            <ClientJob
                              key={index}
                              id={job.id}
                              workdesc={job.workdesc}
                              companyLogoUrl={job.companyLogoUrl}
                              postedDate={job.postedDate}
                              isLast={index === jobData.length - 1}
                              applicantcount={job.applicants}
                              status={job.status}
                            />
                          ))
                      )}           
                    </Box>
                  </Box>
               )
               }
               {selectedSection==='ongoing' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography  className='jobs-category' sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}}>Ongoing Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' >Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData.filter((job) => ['Ongoing'].includes(job.status)).length === 0 ? (
                        <Typography sx={{ fontSize: '18px', padding: '20px', textAlign: 'center' }}>No ongoing jobs found.</Typography>
                      ) : (
                        jobData
                          .filter((job) => ['Ongoing'].includes(job.status))
                          .map((job, index) => (
                            <ClientJob
                              key={index}
                              id={job.id}
                              workdesc={job.workdesc}
                              companyLogoUrl={job.companyLogoUrl}
                              postedDate={job.postedDate}
                              isLast={index === jobData.length - 1}
                              applicantcount={job.applicants}
                              status={job.status}
                            />
                          ))
                      )}    
                      
                    </Box>
                  </Box>
               )
               }
            </Box>
         </Box>
    </Box>
    </Box>
    
  );
};

export default ClientManageJobs;
