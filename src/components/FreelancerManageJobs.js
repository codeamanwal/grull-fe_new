// ManageJobsPage.js
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link,useNavigate, useParams } from 'react-router-dom';
import Job from './Job';
import '../styles/freelancermanagejobs.css';
import axios from 'axios';
import BAPI from '../helper/variable';
import Header3 from './Header3';

const ManageJobs = () => {
  const { section } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const [selectedSection, setSection] = useState(section || 'applied');
  const navigate=useNavigate();
  const [deliverables,setDeliverables]=useState({
    'total':0,
    'completed':0
  })
  const handleButtonClick=(selectedsection)=>{
         setSection(selectedsection);
         navigate(`/managejobs/${selectedsection}`)
  }
  useEffect(() => {
    if (section) {
      setSection(section);
    }
  }, [section]);
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
          // setApplications(prevApplications => {
          //   const newApplications = response.data.results.filter(newApp => !prevApplications.some(existingApp => existingApp.id === newApp.id));
          //   return [...prevApplications, ...newApplications];
          // });
          setApplications(response.data.results)
          if (response.data.next) {
            await getApplications(page + 1);
          }
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
  const [savedJobs,setSavedJobs]=useState([]);

  useEffect(() => {
    const getsavedjobs = async (page = 1) => {
      try {
        const response = await axios.get(`${BAPI}/api/v0/jobs/saved-jobs/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          // params: {
          //   page: page,
          //   per_page: 8,
          // },
        });

        if (response.status === 200) {
          console.log("saved jobs : ",response.data)
          setSavedJobs(response.data)
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    getsavedjobs();
  }, []);

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
            <Box className='managejobs-opts' sx={{boxShadow: '0px 0px 4px 1px #00000040',borderRadius:'16px',padding:'22px',display:'flex',flexDirection:'column',gap:'10px',alignSelf:'flex-start',marginTop:'160px'}}>
               <Button sx={{fontSize:'17px',backgroundColor:section==='applied'?'#d7d7d7':'#e3e3e3',color:section!=='applied'?'rgba(0,0,0,0.5)':'#000',borderRadius:'16px',padding:'9px 12px',textTransform:'none',':hover':{backgroundColor:section==='applied'?'#d7d7d7':'#e3e3e3',color:section!=='applied'?'rgba(0,0,0,0.5)':'#000',}}}
               onClick={()=>{handleButtonClick('applied')}}>Applied Jobs</Button>
               <Button sx={{fontSize:'17px',backgroundColor:section==='saved'?'#d7d7d7':'#e3e3e3',color:section!=='saved'?'rgba(0,0,0,0.5)':'#000',borderRadius:'16px',padding:'9px 12px',textTransform:'none',':hover':{backgroundColor:section==='saved'?'#d7d7d7':'#e3e3e3',color:section!=='saved'?'rgba(0,0,0,0.5)':'#000',}}}
               onClick={()=>{handleButtonClick('saved')}}>Saved Jobs</Button>
               <Button sx={{fontSize:'17px',backgroundColor:section==='ongoing'?'#d7d7d7':'#e3e3e3',color:section!=='ongoing'?'rgba(0,0,0,0.5)':'#000',borderRadius:'16px',padding:'9px 12px',textTransform:'none',':hover':{backgroundColor:section==='ongoing'?'#d7d7d7':'#e3e3e3',color:section!=='ongoing'?'rgba(0,0,0,0.5)':'#000',}}}
               onClick={()=>{handleButtonClick('ongoing')}}>Ongoing Jobs</Button>
               <Button sx={{fontSize:'17px',backgroundColor:section==='completed'?'#d7d7d7':'#e3e3e3',color:section!=='completed'?'rgba(0,0,0,0.5)':'#000',borderRadius:'16px',padding:'9px 12px',textTransform:'none',':hover':{backgroundColor:section==='completed'?'#d7d7d7':'#e3e3e3',color:section!=='completed'?'rgba(0,0,0,0.5)':'#000',}}}
               onClick={()=>{handleButtonClick('completed')}}>Completed Jobs</Button>
            </Box>
            <Box sx={{  width: '850px',padding:'0 0px 0 90px' }} className='managejobs-display'>
               {selectedSection==='applied' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}} className='jobs-category'>Applied Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/freelancerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData.filter((job) => ['PENDING'].includes(job.status)).length === 0 ? (
                        <Typography sx={{ fontSize: '18px', padding: '20px', textAlign: 'center' }}>No applied jobs found.</Typography>
                      ) : (jobData
                          .filter((job) => ['PENDING'].includes(job.status))
                          .map((job, index) => (
                            <Job
                            passed_from={0}
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
                          )))}
                    </Box>
                  </Box>
               )
               }
               {selectedSection==='completed' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography className='jobs-category' sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}}>Completed Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/freelancerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData.filter((job) => ['COMPLETED'].includes(job.status)).length === 0 ? (
                        <Typography sx={{ fontSize: '18px', padding: '20px', textAlign: 'center' }}>No completed jobs found.</Typography>
                      ) : (jobData
                      .filter((job) => ['COMPLETED'].includes(job.status))
                      .map((job, index) => (
                        <Job
                        passed_from={0}
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
                      )))}
                      
                    </Box>
                  </Box>
               )
               }
               {selectedSection==='ongoing' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography  className='jobs-category' sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}}>Ongoing Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/freelancerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {jobData.filter((job) => ['ONGOING'].includes(job.status)).length === 0 ? (
                        <Typography sx={{ fontSize: '18px', padding: '20px', textAlign: 'center' }}>No ongoing jobs found.</Typography>
                      ) :(jobData
                      .filter((job) => ['ONGOING'].includes(job.status))
                      .map((job, index) => (
                        <Job
                          passed_from={0}
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
                      )))}
                      
                    </Box>
                  </Box>
               )
               }
               {selectedSection==='saved' && (
                  <Box>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography className='jobs-category' sx={{fontSize:'28px',fontWeight:'600',letterSpacing:'-1px'}}>Saved Jobs</Typography>
                        <Link style={{color:'#ED8335',marginLeft:'10px',fontSize:'24px',fontWeight:'600'}} className='manageprofilelink' to='/freelancerprofile'>Manage Profile</Link>
                    </Box>
                    <Box sx={{marginTop:'25px',boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px'}}>
                    {savedJobs.length === 0 ? (
                        <Typography sx={{ fontSize: '18px', padding: '20px', textAlign: 'center' }}>No saved jobs found.</Typography>
                      ) : (savedJobs.map((job, index) => (
                        <Job
                          passed_from={0}
                          key={index}
                          position={job.title}
                          companyName={job.company_name}
                          companyLogoUrl={job.companyLogoUrl}
                          location={job.location}
                          startDate={job.created_at}
                          isLast={index === savedJobs.length - 1}
                          status="SAVED"
                          job_id={job.job_id}
                          total_deliverables={0}
                          completed_deliverables={0}
                        />
                      )))}
                      
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

export default ManageJobs;
