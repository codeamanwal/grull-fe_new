import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { shades } from "../helper/shades";
import section1Text from "../assets/section1Text.svg";
import section1TextCircle from "../assets/section1TextCircle.svg";
import section1Landing from "../assets/section1Landing.webp";
import Lottie from "react-lottie";
import * as animationData from "../jsonAnimations/section1Animation.json";
import "animate.css";
import useScrollToContactUsHook from "../customHooks/useScrollToContactUsHook";

function Section1() {
  const { dustyOrange, lavender, black, white, silverTree, racingGreen } =
    shades;
  const scrollToSection = useScrollToContactUsHook();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Grid
      sx={{
        minHeight: { xs: "90vh" },
        maxHeight: { md: "90vh" },
        width: "100vw",
        background: dustyOrange,
        padding: { xs: "36px 24px", md: "56px 48px" },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "6fr 4fr" },
      }}
    >
      <Box className="animate__animated animate__fadeInLeft">
        <Box
          sx={{
            position: "relative",
            padding: { xs: "0", md: "48px 0 24px 0" },
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <img
              src={section1TextCircle}
              alt="hover circle"
              style={{
                width: "40%",
                objectFit: "contain",
                position: "absolute",
                left: "0",
                top: "-8%",
                right: "0",
                margin: "auto",
                rotate: "-2deg",
                zIndex: 2,
              }}
            />
          </Box>

          <img
            src={section1Text}
            alt="main-text"
            style={{
              position: "inherit",
              width: "90%",
              objectFit: "contain",
              margin: "auto",
              display: "block",
              zIndex: 4,
            }}
          />
        </Box>
        <Box sx={{ width: "90%", margin: { xs: "24px auto", md: "auto" } }}>
          <Typography
            sx={{ typography: { xs: "font_12_500", md: "font_20_500" } }}
          >
            No matter what your business needs, we can connect you with a
            creative expert to make your business look and feel professional.
            Because good design makes great business.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            padding: { xs: "0", md: "24px" },
            display: "flex",
            gap: "24px",
          }}
        >
          <Button
            sx={{
              border: `1px solid ${black}`,
              background: white,
              borderRadius: "16px",
              padding: { xs: "8px 0", md: "12px 24px" },
              typography: { xs: "font_12_700", md: "font_20_700" },
              color: black,
              width: { xs: "120px", md: "200px" },
              cursor:'pointer'
              //   "&:hover": {
              //     background: dustyOrange,
              //     color: white,
              //     border: `1px solid ${white}`,
              //   },
            }}
            onClick={scrollToSection}
          >
            Post a Project
          </Button>

          <Button
            sx={{
              background: dustyOrange,
              color: white,
              border: `1px solid ${white}`,
              padding: { xs: "8px 0", md: "12px 24px" },
              typography: { xs: "font_12_700", md: "font_20_700" },
              borderRadius: "16px",
              width: { xs: "120px", md: "200px" },
              cursor:'pointer'
              //   "&:hover": {
              //     border: `1px solid ${black}`,
              //     background: white,
              //     color:black
              //   },
            }}
            onClick={scrollToSection}
          >
            Find Work
          </Button>
        </Box>
      </Box>
      <Box
        sx={{ position:"relative" }}
        className="animate__animated animate__fadeInRight"
      >
        <Box
          sx={{
            width: { xs: "90%", md: "108%" },
            margin: { xs: "24px 0 0 0" },
            position:{md:'absolute'},
            left:'-100px',
            right:'200px',
            top:0,
            bottom:'-100px'
          }}
        >
          <img
          src={section1Landing}
          alt="hero image"
          style={{
            width: "100%",
            objectFit: "contain",
            margin: "auto",
            display: "block",
          }}
        />
          {/* <Lottie options={defaultOptions} height={"100%"} width={"110%"} /> */}
        </Box>
      </Box>
    </Grid>
  );
}

export default Section1;
