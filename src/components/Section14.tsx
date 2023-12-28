import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import section14VerticalArrow from "../assets/section14VerticalArrow.png";
import section14Characters from "../assets/section14Characters.webp";
import { shades } from "../helper/shades";
import { section11FeatureArr, section8FeatureArr } from "../helper/constant";

function Section14() {
  const {
    royalBlue
  } = shades;
  const isDesktop = useMediaQuery("(min-width:600px)");

  // const [width,setWidth] = useState(100);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  //     const imageSize = 100 + scrollPosition; // Adjust this value as needed
  //     if(document.getElementById('scaleImg')){
  //       document.getElementById('scaleImg').style.width = imageSize + 'px';
  //     }
      
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  // console.log('width ->',width)

  return (
    <Grid sx={{ padding:{xs:"0 24px 24px 24px", md:"48px 24px"}, minHeight: "100vh", width: "100vw" }}>
      <Box
        sx={{
          width:{xs:"90%", md:"72%"},
          margin: "auto",
          display: "block",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ textAlign: "center", display: "block",typography:{xs:"font_12_500",md:"font_20_500"} }}
        >
          Amidst the 77% of freelancers feeling isolated and 64% experiencing
          inconsistent professional growth, Grull's community aims to be a
          beacon, offering a space for networking, collaboration, and continuous
          learning, ensuring freelancers not only stay connected but also remain
          at the forefront of industry advancements.
        </Typography>
        <img
          src={section14VerticalArrow}
          alt="vertical arrow"
          style={{
            height:isDesktop ?  "192px" : "96px",
            objectFit: "contain",
            display: "block",
            margin: isDesktop ? "48px auto" : "24px auto",
          }}
        />
        <Typography sx={{ color: royalBlue,typography:{xs:"font_24_800",md:"font_64_800"} }}>
          Forge Connections, Build <br /> Your Network
        </Typography>
        <img
          src={section14Characters}
          id="scaleImg"
          alt="section14Characters"
          style={{
            width:isDesktop ? "60%" : "100%",
            // width:`${width}px`,
            objectFit: "contain",
            display: "block",
            margin:isDesktop ? "48px auto" : "24px auto",
          }}
        />
      </Box>
      <Box
        sx={{
          width:{xs:"100%", md:"90%"},
          display:{xs:"block", md:"flex"},
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
          gap:'56px',
      

        }}
      >
        {section11FeatureArr.map((card) => {
          return (
            <Box
              sx={{
                height:{xs:"fit-content", md:"280px"},
                width: "100%",
                border: "1px solid black",
                borderRight: "8px solid black",
                borderBottom: "8px solid black",
                borderRadius: "16px",
                padding:{xs:"12px", md:"24px"},
                background: royalBlue,
                margin:{xs:"20px 0",md:""}
              }}
              key={card.title}
            >
              <Box sx={{height:{xs:"24px",md:"48px"},width:{xs:"24px",md:"48px"}}}>
              <img
                src={card.icon}
                alt={card.title}
                style={{ height: "100%", width: "100%", marginBottom: "12px" }}
              />
                </Box>
              <Typography sx={{ color: "white",display:'block',typography:{xs:"font_12_700",md:"font_24_700"} }}>
                {card.title}
              </Typography>
              <Typography sx={{ color: "white",display:'block',typography:{xs:"font_12_500",md:"font_20_500"} }}>
                {card.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
}

export default Section14;
