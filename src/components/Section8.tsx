import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { section8FeatureArr } from "../helper/constant";
import { shades } from "../helper/shades";

function Section8() {
  const { royalBlue } = shades;

  return (
    <Grid sx={{ padding: { xs: "24px", md: "100px 24px" } }}>
      <Box
        sx={{
          display: "grid",
          margin: "auto",
          width: { xs: "100%", md: "90%" },
        }}
      >
        <Typography
          sx={{ typography: { xs: "font_24_800", md: "font_48_800" } }}
        >
          What you get at the Grull marketplace
        </Typography>
        <Typography
          sx={{
            width: { xs: "100%", md: "60%" },
            margin: "24px 0",
            typography: { xs: "font_12_500", md: "font_20_500" },
          }}
        >
          "Dive into a freelancing oasis designed for seamless collaboration,
          where client-freelancer partnerships flourish effortlessly and trust
          is built organically."
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4,1fr)" },
          gap:{xs:"12px", md:"24px"},
          width: { xs: "100%", md: "90%" },
          margin: { xs: "20px 0  0 0", md: "48px auto 0 auto" },
        }}
      >
        {section8FeatureArr.map((card) => {
          return (
            <Box
              sx={{
                height: { xs: "160px", md: "240px" },
                width: "100%",
                border: "1px solid black",
                borderTop: "8px solid black",
                borderLeft: "8px solid black",
                borderRadius: "16px",
                padding: { xs: "12px", md: "32px" },
                background: royalBlue,
              }}
              key={card.index}
            >
              <Box
                sx={{
                  width: { xs: "28px", md: "56px" },
                  height: { xs: "28px", md: "56px" },
                  paddingBottom: { xs: "", md: "24px" },
                }}
              >
                <img
                  src={card.icon}
                  alt={card.index}
                  style={{ height: "100%", width: "100%" }}
                />
              </Box>

              <Typography sx={{ color: "white",typography:{xs:"font_10_500",md:"font_12_400"} }}>
                {card.index}
              </Typography>
              <Typography sx={{ color: "white",typography:{xs:"font_12_700",md:"font_24_700"} }}>
                {card.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
}

export default Section8;
