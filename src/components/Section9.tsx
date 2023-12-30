import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { shades } from "../helper/shades";
import { section9Arr } from "../helper/constant";

function Section9() {
  const { lavender} =  shades;
  const isDesktop = useMediaQuery("(min-width:600px)");


  return (
    <Grid sx={{ padding:{xs:"0", md:"24px"} }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: "12px", md: "48px" },
          padding:{xs:"24px",md:"0"}
        }}
      >
        {[
          {
            text: "Freelancer",
          },
          {
            text: "Client",
          },
        ].map((obj) => {
          return (
            <Box
              key={obj.text}
              sx={{
                width: "200px",
                padding: "16px",
                border: "1px solid black",
                borderRadius: "16px",
                textAlign: "center",
                cursor:'pointer',
                typography: { xs: "font_12_600", md: "font_20_600" },
                "&:hover": {
                  background: lavender,
                },
              }}
            >
              {obj.text}
            </Box>
          );
        })}
      </Box>
      <Box
      id="section9Scroll"
        sx={{
          width: "100%",
          margin:{xs:"0px 0 24px 24px", md:"24px auto"},
          display: "flex",
          position: "relative",
          padding:{xs:"30px 0 12px 0" ,md:"30px 0 24px 48px"},
          overflow: "scroll",

        }}
      >
        {section9Arr.map((card) => {
          return (
            <Box
              sx={{
                minWidth:{xs:"200px", md:"400px"},
                position: "relative",
                paddingRight: "24px",
                borderTop: "1px solid black",
              }}
              key={card.title}
            >
              <Typography
                variant="font_32_700"
                sx={{ display: "block", margin: {xs:"20px 0 12px 0",md:"48px 0 24px 0"},typography:{xs:"font_14_700",md:"font_32_700"} }}
              >
                {card.title}
              </Typography>
              <Typography sx={{ display: "block",typography:{xs:"font_12_500",md:"font_20_500"} }}>
                {card.text}
              </Typography>
              <Box
                sx={{
                  height: { xs: "20px", md: "40px" },
                  width: { xs: "20px", md: "40px" },
                  typography: { xs: "font_10_700", md: "font_20_700" },
                  background: lavender,
                  borderRadius: "50%",
                  display: "grid",
                  placeContent: "center",
                  position: "absolute",
                  top:isDesktop ? "-20px" : "-10px",
                  left: 0,
                  border: "1px solid black",
                }}
              >
                {card.step}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
}

export default Section9;
