import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import {
  Button,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
} from '@mui/material';
import Logo from "../assets/Logo1.png";
import mobilelogo from "../assets/grullPurpuleMobileLogo.svg"
import { LuMenu } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Header1() {
    const container = useRef();
    const savedName='akarsh'
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const getInitials = (name) => {
        // Check if name is defined before splitting
        if (name) {
            const names = name.split(' ');
            return names[0][0].toUpperCase();
        } else {
            return ''; // Handle the case where name is undefined
        }
    };
    const navigate =useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const avatarBackgroundColor = 'Grey';
    const clickProfileImage = () => {
        // setShowDropdown(!showDropdown);
        setShowDropdown((prevState) => ({ open: !prevState.open }));
    }
    const clickLogout = () => {
        navigate('/')
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
    const viewProfileClick = () => {
        navigate('/freelancerprofile');
    }

  return (
    <Grid container sx={{ background: '#000000', height:{xs:'60px', sm:'70px'}, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding : {xs:'0px 4%',md:'0 6%'}, flexWrap: 'nowrap' }}>
                <Grid item >
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap:{md:'25px',lg:'40px'}, alignItems: 'center' }}>
                       {/* <Typography sx={{color:'#B27EE3'}}>Grull</Typography> */}
                       {isSmallScreen ? (
                            <img src={mobilelogo} alt='GRULL' style={{ width: '60px', height: '38px' }} />
                        ) : (
                            <img src={Logo} alt='GRULL' style={{ width: '100px', height: '38px' }} />
                        )}
                        <Box sx={{display:{xs:'none',md:'block'}}}>
                            <Button  sx={{color:'#fff'}}>Find Work</Button>
                        </Box>
                        <Box sx={{display:{xs:'none',md:'block'}}}>
                            <Button endIcon={<MdArrowOutward />}  sx={{color:'#fff',border: '1px solid #FFFFFF', borderRadius: '16px',padding: '7px 14px'}}>
                            Post a Project
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                <Grid item >
                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap:{md:'25px',lg:'40px'}, alignItems: 'center' }}>
                            <Box sx={{display:{xs:'none',md:'block'}}}>
                                <Button sx={{color:'#fff'}}>Learn</Button>
                            </Box>
                            <Box sx={{display:{xs:'none',md:'block'}}}>
                                <Button sx={{color:'#fff'}}>Collaborate</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap:{xs:'8px',sm:'30px', md:'25px',lg:'40px'}, alignItems: 'center' }}>
                                <IconButton sx={{fontSize:{ xs:'24px',sm:'30px'}}}>
                                   <FiMessageSquare style={{ color: '#fff'}} />
                                </IconButton>
                                <IconButton sx={{fontSize:{ xs:'27px',sm:'33px'}}}>
                                   <IoMdNotificationsOutline style={{ color: '#fff'}} />
                                </IconButton>
                                <Box ref={container} sx={{position:'relative'}}>
                                    <Avatar
                                        alt={savedName}
                                        sx={{ backgroundColor: avatarBackgroundColor }}
                                        // className='dashboardavatar profile'
                                        onClick={clickProfileImage}
                                    >
                                        {getInitials(savedName)}
                                    </Avatar>
                                    {showDropdown.open && (
                                        <Menu
                                        anchorEl={container.current}
                                        open={showDropdown.open}
                                        onClose={() => setShowDropdown({ open: false })}
                                        MenuListProps={{
                                            style: {
                                              padding:'15px 30px 20px 20px',
                                            },
                                          }}
                                        >
                                        <MenuItem sx={{padding:'2px 0',':hover':{backgroundColor:'transparent'},backgroundColor:'#fff',}}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                                <Avatar
                                                    alt={savedName}
                                                    style={{ backgroundColor: avatarBackgroundColor,width:'80px',height:'80px',marginRight:'10px' }}                    
                                                    onClick={clickProfileImage}
                                                >
                                                    {getInitials(savedName)}
                                                </Avatar>
                                                <div style={{ marginRight: '30px', display: 'flex', flexDirection: 'column' }}>
                                                    <Typography style={{ margin: '0', fontWeight:'700',fontSize:'20px'}}>{savedName}</Typography>
                                                    <Typography style={{ margin: '0',color:'#454545',fontWeight:'500',fontSize:'16px'}}>Job Category</Typography>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        <MenuItem sx={{padding:'2px 0',marginTop:'5px',':hover':{backgroundColor:'transparent',minHeight:'0'},backgroundColor:'#fff',}}>
                                            <Button onClick={viewProfileClick} sx={{border: '1px solid #B27EE3',fontWeight:'600',color:'#B27EE3',width:'100%',borderRadius:'16px'}}>View Profile</Button>
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/" sx={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:{xs:'2px 0'},marginTop:'5px',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>Dashboard</MenuItem>
                                        <MenuItem component={NavLink} to="/page2" sx={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:'2px 0',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>Wallet</MenuItem>
                                        <MenuItem component={NavLink} to="/page3" sx={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:'2px 0',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>Settings</MenuItem>
                                        <Divider style={{ width: '100%',height:'2px',backgroundColor:'#0000004D' }} />
                                        <MenuItem onClick={clickLogout} sx={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:'4px 0',':hover':{backgroundColor:'transparent'},minHeight:'0'}}>Logout</MenuItem>
                                        </Menu>
                                    )}
                                </Box>
                                <IconButton sx={{display:{xs:'block',md:'none'}, fontSize:{ xs:'24px',sm:'30px'}}}>
                                   <LuMenu style={{ color: '#fff', }} onClick={clickProfileImage}/>
                                </IconButton>
                            </Box>
                        </Box>
                </Grid>
    </Grid>
  )
}
