import React,{useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button,Grid } from '@mui/material';
import { FiHome } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi"
import Avatar from '@mui/material/Avatar';
import {useNavigate } from 'react-router-dom';
import Freelancerwallet from './Freelancerwallet';
import '../styles/freelancerdashboard.css'
import ClientHome from './ClientHome';
import { CiShare2 } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io"

interface Props {
  window?: () => Window;
}

export default function ClientDashboard(props: Props) {

  const [activeButton, setActiveButton] = useState('home');
  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'manageJobs') {
      navigate('/clientmanagejobs/posted');
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { windows } = props;
  const container = windows !== undefined ? () => windows().document.body : undefined;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const getDrawerWidth = () => {
    if (windowWidth <1075) {
      return 0;
    }if (windowWidth <1150) {
      return 260;
    }if (windowWidth<1350) {
      return 300;
    }
    else{
      return 340;
    }
  };

  const drawer = (
    <div style={{backgroundColor:'#000',paddingLeft:'80px',paddingRight:'40px',height:'100vh'}} className='dashboard-drawer'>
      <Box sx={{display:'flex',padding:'18px 0'}} >
        <Typography sx={{color: '#B27EE3',fontSize:'25px',fontWeight:'700'}}>GRULL</Typography>
      </Box>
      <Box sx={{marginTop:'100px'}}>
         <Box sx={{padding:'10px 0px 25px',display:'flex',flexDirection:'row',gap:'18px',alignItems:'center',justifyContent:'center' }}>
             <Avatar alt="Remy Sharp" onClick={()=>{navigate('/employerprofile')}} src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=360" />
             <Grid sx={{display:'flex', flexDirection:'column',gap:'0px'}}>
               <Typography sx={{fontSize:'18px',fontWeight:'500',color:'#fff'}}>Astle Benjamin</Typography>
               <Typography sx={{fontSize:'15px',fontWeight:'500',color:'#fff',opacity:'0.8'}}>UI UX Designer</Typography>
             </Grid>
         </Box>
         <Box
            sx={{
              backgroundImage: 'linear-gradient(90deg, #ED8335 0%, #B27EE3 100%)',
              height: '1px',
              width: '100%',
            }}
          />
         <Box sx={{padding:'30px 7px 0',display:'flex',flexDirection:'column',gap:'14px'}}>
             <Button 
                sx={{color:'#fff',textTransform:'none',fontSize:'17px',fontWeight:'500',borderRadius:'16px',justifyContent:'left',paddingLeft:'16px',backgroundColor: activeButton === 'home' ? '#7C7C7C' : 'transparent','&:hover': {backgroundColor: activeButton === 'home' ? '#7C7C7C' : 'transparent',},}} 
                startIcon={<FiHome />} onClick={() => handleButtonClick('home')} >Home</Button>
             <Button 
                sx={{color:'#fff',textTransform:'none',fontSize:'17px',fontWeight:'500',borderRadius:'16px',justifyContent:'left',paddingLeft:'16px',backgroundColor: activeButton === 'wallet' ? '#7C7C7C' : 'transparent','&:hover': {backgroundColor: activeButton === 'wallet' ? '#7C7C7C' : 'transparent',},}} 
                startIcon={<IoWalletOutline />} onClick={() => handleButtonClick('wallet')} >Wallet</Button>
             <Button
                sx={{color:'#fff',textTransform:'none',fontSize:'17px',fontWeight:'500',borderRadius:'16px',justifyContent:'left',paddingLeft:'16px',backgroundColor: activeButton === 'manageJobs' ? '#7C7C7C' : 'transparent','&:hover': {backgroundColor: activeButton === 'manageJobs' ? '#7C7C7C' : 'transparent',},}} 
                startIcon={<FiShoppingBag />} onClick={() => handleButtonClick('manageJobs')} >Manage Jobs</Button>
         </Box>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${getDrawerWidth()}px)` },
          ml: { sm: `${getDrawerWidth()}px` },
          backgroundColor:'#EDEDED',
          boxShadow:" 0px 0px 4px 0.5px #00000040",
          height:"80px",
          display:'flex',
          justifyContent:'center',
          padding:'0px 80px 0 60px ',
        }}
        className='dashboard-navbar'
      >
        <Toolbar sx={{
            display:'flex',
            justifyContent:'space-between'
        }} >
            <Box >
                <Typography style={{
                    // fontFamily: 'Urbanist',
                    fontSize: '40px',
                    fontWeight: 780,
                    color:'#000000',
                    lineHeight: '58px',
                    letterSpacing: '-2px',
                    textAlign: 'left', }} >
                Dashboard </Typography>
            </Box>
            <Box sx={{display:'flex',gap:'40px',alignItems:'center'}} className='dashboard-navbar-buttons'>
                  <Box
                  sx={{
                    background: 'linear-gradient(90deg, #ED8335 0%, #B27EE3 100%)',
                    // display: 'inline-block',
                    padding: '1px',
                    borderRadius: '17px',
                  }}
                >
                  <Button
                    sx={{width: '160px',height: '40px',padding: '10px',gap: '10px',background: '#FFF',boxShadow: '0px 0px 4px 0px #00000040',border: 'none', borderRadius: '16px',color:'#000',textTransform: 'none',fontSize:'16px',':hover':{background:"#fff"}}}
                    >Grull Premium
                  </Button>
                </Box>
                <Button
                  sx={{width: '160px',height: '40px',padding: '10px',gap: '10px',background: '#FFF',boxShadow: '0px 0px 4px 0px #00000040',borderRadius: '16px',color:'#000',textTransform: 'none', fontSize:'16px'}}> 
                  {<CiShare2 style={{height:'1.5em',width:'1.3em'}}/>}Share Profile
                </Button>
                <FiMessageSquare style={{color:'#0c0c0c',fontSize:'30px',':hover':{}}}/>
                <IoMdNotificationsOutline style={{color:'#414141',fontSize:'35px'}}/>
                <Avatar alt="Remy Sharp" onClick={()=>{navigate('/employerprofile')}} src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=360" />
            </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: getDrawerWidth() }, flexShrink: { sm: 0 }, backgroundColor:'#000' }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            backgroundColor:'#000',
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: getDrawerWidth() },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: getDrawerWidth() },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ py:3, width: { sm: `calc(100% - ${getDrawerWidth()}px)` } }}
      >
        <Toolbar />
        {activeButton === 'home' && (
          <ClientHome />
        )}
        {activeButton === 'wallet' && (
          <Freelancerwallet />
        )}
      </Box>
    </Box>
  );
}