import { Box, Grid, Typography } from "@mui/material";
import React, { useRef } from "react";
import { shades } from "../helper/shades";
import arrowRight from "../assets/arrowRight.svg";
import { section3CardsArr } from "../helper/constant";
import { useIsInViewport } from "../customHooks/useIsInViewPort";
import { useNavigate } from "react-router-dom";

function Section3() {
  const { black } = shades;
  const ref = useRef(null);
  const isIntersecting = useIsInViewport(ref);
  const navigate = useNavigate()

  return (
    <Grid
      ref={ref}
      sx={{
        padding: { xs: "24px", md: "32px" },
        display: "grid",
        background: "rgba(237, 131, 53, 0.05)",
      }}
    >
      <Grid sx={{ width: "90%", margin: "auto" }}>
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: black,
              typography: { xs: "font_24_700", md: "font_48_800" },
            }}
          >
            Best Designs for your Business
          </Typography>
          <Typography
            variant="font_26_600"
            sx={{ display: { xs: "none", md: "block" },cursor:'pointer' }}
            onClick={() => navigate('/coming-soon')}
          >
            View all categories
            <img
              src={arrowRight}
              alt="arrowRight"
              style={{ width: "28px", height: "20px", marginLeft: "8px" }}
            />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: 'space-between', xl: 'center' },
            alignItems: "center",
            margin: { xs: "24px 0", md: "60px 0" },
            flexWrap: { xs: "wrap", md: "" },
            gap: {xs:"12px",xl:'25px'},
          }}
        >
          {section3CardsArr.map((card, i) => {
            return (
              <Box
                sx={{
                  height: { xs: "160px", md: "340px" },
                  width: { xs: "140px", md: "280px" },
                  border: `1px solid ${black}`,
                  borderRadius: "16px",
                  boxShadow: `0px 0px 4px 0px rgba(0, 0, 0, 0.25)`,
                  display: "grid",
                  gridTemplateRows: "6fr 4fr",
                  overflow: "hidden",
                }}
                className={
                  isIntersecting
                    ? i < 2
                      ? "animate__animated animate__fadeInLeft"
                      : "animate__animated animate__fadeInRight"
                    : ""
                }
                key={card.text}
              >
                <img
                  src={card.logo}
                  alt="logo"
                  style={{ width: "100%", objectFit: "contain" }}
                />

                <Box
                  sx={{
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: black,
                      textAlign: "center",
                      typography: { xs: "font_12_600", md: "font_26_600" },
                    }}
                  >
                    {card.text}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section3;
