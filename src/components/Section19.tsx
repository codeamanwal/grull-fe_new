import { Box, Grid, Input, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import section19Character from "../assets/section19Character.png";
import { shades } from "../helper/shades";

function Section19() {
  const { silverTree } = shades;
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <Grid
      sx={{
        minHeight: {xs:"fit-content",md:"70vh"},
        width: "100vw",
        display: "grid",
        placeContent: "center",
      }}
    >
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns:{xs:"1fr", md:"3fr 7fr"},
          width:{xs:"100%", md:"90%"},
          margin: "auto",
        }}
      >
        <Box sx={{ position: "relative" }}>
        <Typography
            sx={{ color: silverTree, display:{xs:"block", md:"none"},typography:{xs:"font_20_700",md:"font_48_900"},textAlign:{xs:"center",md:"0"} }}
          >
            Stay Up-to Date
          </Typography>
          <img
            src={section19Character}
            alt="section19Character"
            style={{
              width:isDesktop ? "90%" : "60%",
              objectFit: "contain",
              margin:isDesktop ? "auto" : "24px auto",
              display: "block",
              position: isDesktop ? "absolute" : "static",
              bottom: "-50px",
              left: 0,
              right: 0,
              top: 0,
            }}
          />
        </Box>
        <Box sx={{ display: "grid", placeContent: "center" }}>
          <Typography
            variant="font_48_900"
            sx={{ color: silverTree, display:{xs:"none", md:"block"} }}
          >
            Stay Up-to Date
          </Typography>
          <Typography sx={{ color: "black",typography:{xs:"font_12_600",md:"font_32_600"},textAlign:{xs:"center",md:"left"},margin:{xs:"0 24px",md:"0"}, }}>
            Subscribe to Our Newsletter for the Latest Updates and Exclusive
            Content
          </Typography>

          <Box
            sx={{
              height: "80px",
              width: "90%",
              typography:{xs:"font_12_500", md:"font_20_400"},
              position: "relative",
              margin:{xs:"16px auto", md:"48px 0 0 0"},
            }}
          >
            <Input
              type="text"
              placeholder="Enter Your Email*"
              style={{
                height: "100%",
                width: "100%",
                border: "1px solid black",
                padding: "12px 36px",
                borderRadius: "16px",
              }}
            />
            <Box
              sx={{
                width:{xs:"100px", md:"200px"},
                padding: "16px 0",
                height: "min-content",
                borderRadius: "16px",
                background: "black",
                color: "white",
                textAlign: "center",
                position: "absolute",
                top: 0,
                bottom: 0,
                right: "20px",
                margin: "auto",
              }}
            >
              Count Me In!
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section19;
