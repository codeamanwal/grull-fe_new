// ManageJobsPage.js
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link,useNavigate, useParams } from 'react-router-dom';
import Job from './Job';
import '../styles/freelancermanagejobs.css';

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

const jobData = [
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Started on Tue',
    status: 'Posted'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Started on Tue',
    status: 'Posted'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Started on Tue',
    status: 'Posted'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Saved on Tue',
    status: 'Completed'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Saved on Tue',
    status: 'Completed'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Saved on Tue',
    status: 'Completed'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Started on Tue',
    status: 'Ongoing'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Started on Tue',
    status: 'Ongoing'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Started on Tue',
    status: 'Ongoing'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Saved on Tue',
    status: 'Saved'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Saved on Tue',
    status: 'Saved'
  },
  {
    position: 'UI/UX Designer',
    companyName: 'Elula Tech Pvt Ltd',
    companyLogoUrl: 'https://media.licdn.com/dms/image/C510BAQEsvVxzwMgdIw/company-logo_200_200/0/1631404454753/elula_tech_logo?e=2147483647&v=beta&t=5LL6mvKtNqrsx91XKdfj_LoxHiXkfbp_6wmf5-LXDH0',
    location: 'Bengaluru, Karnataka',
    startDate: 'Saved on Tue',
    status: 'Saved'
  },
];
  return (
    <Box sx={{padding:'50px 90px'}} className='managejobs-page'>
         <Box>
           <Typography sx={{fontSize: '32px', fontWeight: 700, lineHeight: '38px', letterSpacing: '-1px',textAlign: 'left',  }} className='managejobs-title'>
              Manage Jobs
            </Typography>
         </Box>

         <Box sx={{marginTop:'50px',display:'flex',flexDirection:'row',width:'100%' }} className='managejobs'>
            <Box className='managejobs-opts' sx={{boxShadow: '0px 0px 4px 1px #00000040',borderRadius:'16px',padding:'22px',display:'flex',flexDirection:'column',gap:'10px',alignSelf:'flex-start',marginTop:'160px'}}>
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
                        <Typography sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}} className='jobs-category'>Post Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/employerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData
                      .filter((job) => ['Posted'].includes(job.status))
                        .map((job, index) => (
                          <Job
                            key={index}
                            position={job.position}
                            companyName={job.companyName}
                            companyLogoUrl={job.companyLogoUrl}
                            location={job.location}
                            startDate={job.startDate}
                            isLast={index === jobData.length - 1}
                            status={job.status}
                          />
                        ))}
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
                    {jobData
                      .filter((job) => ['Completed'].includes(job.status))
                      .map((job, index) => (
                        <Job
                          key={index}
                          position={job.position}
                          companyName={job.companyName}
                          companyLogoUrl={job.companyLogoUrl}
                          location={job.location}
                          startDate={job.startDate}
                          isLast={index === jobData.length - 1}
                          status={job.status}
                        />
                      ))}
                      
                    </Box>
                  </Box>
               )
               }
               {selectedSection==='ongoing' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography  className='jobs-category' sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}}>Ongoing Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/employerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData
                      .filter((job) => ['Ongoing'].includes(job.status))
                      .map((job, index) => (
                        <Job
                          key={index}
                          position={job.position}
                          companyName={job.companyName}
                          companyLogoUrl={job.companyLogoUrl}
                          location={job.location}
                          startDate={job.startDate}
                          isLast={index === jobData.length - 1}
                          status={job.status}
                        />
                      ))}
                      
                    </Box>
                  </Box>
               )
               }
               {selectedSection==='saved' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography className='jobs-category' sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}}>Saved Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/employerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData
                      .filter((job) => ['Saved'].includes(job.status))
                      .map((job, index) => (
                        <Job
                          key={index}
                          position={job.position}
                          companyName={job.companyName}
                          companyLogoUrl={job.companyLogoUrl}
                          location={job.location}
                          startDate={job.startDate}
                          isLast={index === jobData.length - 1}
                          status={job.status}
                        />
                      ))}
                      
                    </Box>
                  </Box>
               )
               }
            </Box>
         </Box>
    </Box>
  );
};

export default ClientManageJobs;
