import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { shades } from "../helper/shades";
import Navbar from "../components/Navbar";
import section6SocialMedia from '../assets/section6SocialMedia.webp'

function ComingSoon() {
  const { dustyOrange } = shades;
  return (
    <Grid sx={{ minHeight: "100vh", width: "100vw", background: dustyOrange,}}>
      <Navbar />
      <Grid sx={{display:'grid',placeContent:"center",textAlign:"center",height:"100%",width:"80%",margin:"48px auto auto auto"}}>
        <Typography color="white" sx={{typography:{xs:"font_24_800",md:"font_48_800"}}}>
          Coming Soon !
        </Typography>
        <Typography sx={{typography:{xs:"font_16_500",md:"font_24_500"}}} >
          Thank you for showing interest, we are launching soon! Stay Tuned!
        </Typography>
        <Box sx={{width:{xs:"250px",md:"500px"},margin:"48px auto auto auto"}}>
        <img src={section6SocialMedia} alt="comming soon" style={{width:"100%",objectFit:"contain"}} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ComingSoon;
