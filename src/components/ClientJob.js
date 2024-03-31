import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { HiDotsVertical } from 'react-icons/hi';
import { Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import { FaHeart } from "react-icons/fa";
import '../styles/freelancermanagejobs.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BAPI from '../helper/variable'
import { useNavigate } from 'react-router-dom';
const ClientJob = ({ id, title, companyLogoUrl, companyName, postedDate, isLast, applicantcount, status}) => {
  
  const accessToken = localStorage.getItem('accessToken');
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
      };
   const Clickwithdraw=async(job_id)=>{
    console.log(job_id)
    try{
        const response = await axios.delete(`${BAPI}/api/v0/jobs/${job_id}`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
              },
          });
          console.log(response);
          if (response.status===200) {
              console.log('Jobs Withdrawn successfully');
          }
      }
      catch (error) {
        console.error('Error occurred:', error);
    }
   }
   const navigate=useNavigate()
   const handleView=(job_id)=>{
    navigate(`/clientchat`)
}
  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'row' }} className='job' >
        <Box sx={{ display: 'flex' }}>
          <img className='jobcomplogo'
            style={{ width: '50px', height: '50px' }}
            alt={companyName}
            src={companyLogoUrl}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2px', justifyContent: 'space-between', paddingLeft: '22px', flex: 1 }} className='job-container'>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:'20px',marginRight:'50px',flex:1,flexWrap:'wrap'}} className='job-description'>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <Typography sx={{ color: "#000", fontSize: '22px' }} className='job-con1'>{title}</Typography>
                  <Typography sx={{ color: "#656565", fontSize: '15px' }} className='job-con3'>Posted On {formatDate(postedDate)}</Typography>
                  <Link style={{ display: status !== 'PENDING' ? 'none' : 'inline', color: '#2F66EC' }} to={`/jobapplications/${id}`}>View {applicantcount} Applicants</Link>

                </Box>
                {status === 'ONGOING' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Slider className='ongoingjobslider' sx={{ color: '#ED8335', height: '8px', width: '300px', marginLeft: '10px', '& .MuiSlider-thumb': { width: '20px', height: '20px' } }} />
                    </Box>
                  ) : status === 'PENDING' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button className='job-action' sx={{ backgroundColor: '#B27EE3', color: '#fff', textAlign: 'center', borderRadius: '16px', padding: '8px 0px', width: '120px', textTransform: 'none', ':hover': { backgroundColor: '#B27EE3', color: '#fff' } }} onClick={()=>{Clickwithdraw(id)}}>Withdraw</Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ backgroundColor:  '#2E81FF' , color: '#FFF', textAlign: 'center', borderRadius: '16px', padding: '8px 0px', width: '120px' }} className='job-action'>{status}</Typography>
                    </Box>
                  )}
                  {
                    status==='ONGOING'?(<Button onClick={()=>{handleView(id)}}>Chat Now</Button>):null
                  }
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center',gap:'30px' }} className='job-opts'>
                <FaHeart style={{fontSize:'20px',display:status==='Saved'?'block':'none'}} />
                <HiDotsVertical style={{ fontSize: '22px' }} className='job-dots' />
          </Box>
        </Box>
      </Box>
      {!isLast && <Divider />}
    </React.Fragment>
  );
};

export default ClientJob;
