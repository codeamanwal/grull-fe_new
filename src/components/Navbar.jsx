import { Avatar, Box, Button, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import grullLogo from "../assets/grullLogoPurple.svg";
import redirectArrow from "../assets/redirectArrow.svg";
import grullPurpleMobileLogo from "../assets/grullPurpuleMobileLogo.svg";
import navbarIcon1 from "../assets/navbarIcon1.svg";
import navbarIcon2 from "../assets/navbarIcon2.svg";
import navbarIcon3 from "../assets/navbarIcon3.svg";

import { shades } from "../helper/shades";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useScrollToContactUsHook from "../customHooks/useScrollToContactUsHook";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [accessToken,setAccessToken] = useState(null);
  const [changeopts,setChangeopts]=useState(false);
  const container = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo,setUserinfo]=useState(null);

  useEffect(() => {
    const access = localStorage.getItem('accessToken');
    // console.log(access)
    if (access!==null) {
      setAccessToken(access);
    } else {
      setAccessToken(null);
    }
    console.log(accessToken)
  }, []);

  useEffect(() => {
    if (accessToken) {
      const user = localStorage.getItem('user');
      if (user) {
        setUserinfo(JSON.parse(user));
      }
    }
  }, [accessToken]);

  if (userInfo !== null) {
    console.log(userInfo.full_name);
  }
  
  const { lavender } = shades;
  const isDesktop = useMediaQuery("(min-width:500px)");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const scrollToSection =  useScrollToContactUsHook()
  const clickProfileImage = () => {
    setShowDropdown((prevState) => (!prevState));
}
const clickLogout = () => {
  console.log("LOGOUT..")
  setAccessToken(null)
  setUserinfo(null)
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
}
const handleClickOutside = (e) => {
  if (container.current && !container.current.contains(e.target)) {
      setShowDropdown(false);
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
  const handlesettings =()=>{
    setChangeopts((prev)=>!prev);
  }
  return (
    <>
      <Grid
        sx={{ background: "#121717", padding: { xs: "8px 0", md: "16px 0" } }}
      >
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={isDesktop ? grullLogo : grullPurpleMobileLogo}
              alt="grullLogo"
              style={{ height: "40px", objectFit: "contain", margin: "0 12px",cursor:'pointer' }}
              onClick={() => navigate('/')}
            />
            {["Academy", "Community", "Company"].map((text) => {
              return (
                <Typography
                  key={text}
                  variant="font_20_500"
                  sx={{
                    color: "white",
                    margin: "0 16px",
                    display: { xs: "none", md: "block" },
                    cursor:'pointer'
                  }}
                  onClick={() =>{ return text==='Company'?navigate('/about-us'):navigate('/coming-soon')}}
                >
                  {text}
                </Typography>
              );
            })}
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={navbarIcon1}
              alt="logo"
              style={{ height: "20px", width: "20px" }}
            />
            <img
              src={navbarIcon2}
              alt="logo"
              style={{ height: "20px", width: "20px" }}
            />
            <img
              src={navbarIcon3}
              alt="logo"
              style={{ height: "20px", width: "20px" }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "24px",
            }}
          >
            {
              (accessToken===null)?(<><Box
                sx={{
                  border: "1px solid white",
                  color: "white",
                  width: "200px",
                  textAlign: "center",
                  padding: "12px 0",
                  borderRadius: "16px",
                  typography: "font_18_800",
                  cursor:'pointer'
                }}
                onClick={()=>{navigate('/home')}}
              >
                I’m a Freelancer
                <img
                  src={redirectArrow}
                  alt="redirectArrow"
                  style={{
                    height: "12px",
                    objectFit: "contain",
                    margin: "0 8px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  border: "1px solid white",
                  color: "white",
                  width: "200px",
                  textAlign: "center",
                  padding: "12px 0",
                  borderRadius: "16px",
                  background: lavender,
                  typography: "font_18_800",
                  cursor:'pointer'
                }}
                onClick={()=>{navigate('/home')}}
              >
                Hire a Designer
                <img
                  src={redirectArrow}
                  alt="redirectArrow"
                  style={{
                    height: "12px",
                    objectFit: "contain",
                    margin: "0 8px",
                  }}
                />
              </Box></>):(<>
                <Box ref={container} sx={{position:'relative'}}>
                                    <Avatar
                                        alt={userInfo?.full_name[0]}
                                        sx={{ backgroundColor: 'Grey',cursor:'pointer' }}
                                        // className='dashboardavatar profile'
                                        onClick={()=>{clickProfileImage()
                                            if (changeopts) {
                                                handlesettings();
                                              }
                                        }}
                                    >
                                       {userInfo?.full_name.split(' ').slice(0, 2).map(part => part[0]).join('').toUpperCase()}
                                    </Avatar>
                                    {showDropdown && (
                                        <Box
                                        sx={{
                                              padding:'15px 30px 20px 20px',
                                              display: showDropdown?'block':'none',
                                              position:'absolute',
                                              backgroundColor:'#fff',
                                              zIndex:'1',
                                              top:{xs:'58px',sm:'65px'},
                                              right:{xs:'-55px',sm:'-80px',md:'-20px'},
                                              boxShadow: '0px 0px 4px 1px #00000040',
                                              borderRadius:{xs:'10px',sm:'40px'},
                                              width:{xs:'250px',sm:'280px'},
                                              flexDirection:'column',
                                              gap:'5px',
                                              display:'flex'
                                            }}
                                        >
                                        <Box sx={{padding:'2px 0',':hover':{backgroundColor:'transparent'},backgroundColor:'#fff',}}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar
                                                    alt={userInfo?.full_name}
                                                    style={{ backgroundColor:'Grey',width:'80px',height:'80px',marginRight:'10px' }}                    
                                                >
                                                   {userInfo?.full_name?.split(' ').slice(0, 2).map(part => part[0]).join('').toUpperCase()}

                                                </Avatar>
                                                <div style={{ marginRight: '30px', display: 'flex', flexDirection: 'column' }}>
                                                    <Typography style={{ margin: '0', fontWeight:'700',fontSize:'20px'}}>{userInfo?.full_name}</Typography>
                                                    <Typography style={{ margin: '0',color:'#454545',fontWeight:'500',fontSize:'16px'}}>{userInfo?.role}</Typography>
                                                </div>
                                            </div>
                                        </Box>
                                        <Link style={{padding:'0',marginTop:'5px',':hover':{backgroundColor:'transparent',minHeight:'0'},backgroundColor:'#fff',}} to={userInfo.list_as_freelancer?"/freelancerprofile":"/clientprofile"}>
                                            <Button onClick={()=>viewProfileClick()} sx={{border: '1px solid #B27EE3',fontWeight:'600',color:'#B27EE3',width:'100%',borderRadius:'16px'}}>View Profile</Button>
                                        </Link>
                                        {
                                            !changeopts? (<>
                                            <Link component={NavLink} to={userInfo?.list_as_freelancer?"/freelancer":"/client"} style={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:{xs:'2px 0'},marginTop:'5px',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>Dashboard</Link>
                                            <Link component={NavLink} to={userInfo?.list_as_freelancer?"/freelancer":"/client"} style={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:'2px 0',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>Wallet</Link>
                                            <Link onClick={()=>setChangeopts(!changeopts)} style={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:'2px 0',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>Settings</Link>
                                            <Divider style={{ width: '100%',height:'2px',backgroundColor:'#0000004D' }} />
                                            <Link
                                                to='/'
                                                onClick={clickLogout}
                                                style={{ backgroundColor: '#fff', textDecoration: 'none', color: 'black', fontWeight: '500', padding: '4px 0', ':hover': { backgroundColor: 'transparent' }, minHeight: '0' }}
                                            >
                                                Logout
                                            </Link>
                                            </>):(<>
                                        <Link to={userInfo?.list_as_freelancer?'/browsejobs':'/postjob'} style={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:{xs:'2px 0'},marginTop:'5px',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>{userInfo?.list_as_freelancer?'Find Work':'Post Job'}</Link>
                                        <Link to='/coming-soon' style={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:'2px 0',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>Learn</Link>
                                        <Link to='/coming-soon' style={{backgroundColor:'#fff', textDecoration: 'none', color: 'black',fontWeight:'500',padding:'2px 0',':hover':{backgroundColor:'transparent'},minHeight:'0' }}>Collaborate</Link>
                                            </>)
                                        }
                                        </Box>
                                    )}
                                </Box>
              </>)
            }
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Navbar;
