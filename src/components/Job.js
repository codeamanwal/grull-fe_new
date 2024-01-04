import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { HiDotsVertical } from 'react-icons/hi';
import { Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import { FaHeart } from "react-icons/fa";
import '../styles/freelancermanagejobs.css';
import { useNavigate } from 'react-router-dom';

const Job = ({ position, companyName, companyLogoUrl, location, startDate, isLast,status }) => {
  const navigate=useNavigate();
  const clickApplyNow=()=>{
    navigate('/applyproposal');
  }
  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'row' }} className='job'>
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
                  <Typography sx={{ color: "#000", fontSize: '22px' }} className='job-con1'>{position}</Typography>
                  <Typography sx={{ color: "#656565", fontSize: '18px' }} className='job-con2'>{companyName}</Typography>
                  <Typography sx={{ color: "#656565", fontSize: '18px' }} className='job-con2'>{location}</Typography>
                  <Typography sx={{ color: "#656565", fontSize: '15px' }} className='job-con3'>{startDate}</Typography>
                </Box>
                {status === 'Ongoing' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Slider className='ongoingjobslider' sx={{ color: '#ED8335', height: '8px', width: '300px', marginLeft: '10px', '& .MuiSlider-thumb': { width: '20px', height: '20px' } }} />
                    </Box>
                  ) : status === 'Saved' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button onClick={clickApplyNow} className='job-action' sx={{ backgroundColor: '#B27EE3', color: '#fff', textAlign: 'center', borderRadius: '16px', padding: '8px 0px', width: '120px', textTransform: 'none', ':hover': { backgroundColor: '#B27EE3', color: '#fff' } }} >Apply Now</Button>
                    </Box>
                  ) : status === 'Posted' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button className='job-action' sx={{ backgroundColor: '#B27EE3', color: '#fff', textAlign: 'center', borderRadius: '16px', padding: '8px 0px', width: '120px', textTransform: 'none', ':hover': { backgroundColor: '#B27EE3', color: '#fff' } }}>Withdraw</Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ backgroundColor: status === 'Selected' ? '#47D48733' : status === 'Completed' ? '#2E81FF' : '#D7D7D7', color: status === 'Selected' ? '#47D487' : status === 'Completed' ? '#FFF' : '#000', textAlign: 'center', borderRadius: '16px', padding: '8px 0px', width: '120px' }} className='job-action'>{status}</Typography>
                    </Box>
                  )}
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

export default Job;
