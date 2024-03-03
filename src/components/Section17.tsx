import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { shades } from "../helper/shades";
import section17TextIcon from "../assets/section17TextIcon.png";

function Section17() {
  const { black } = shades;

  return (
    <Grid
      sx={{
        minHeight: { xs: "fit-content", md: "100vh" },
        width: "100vw",
        padding: "32px",
        display: "grid",
      }}
    >
      <Grid sx={{ width: { xs: "100%", md: "90%" }, margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
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
            Get tips, ideas and insights
          </Typography>
        </Box>
        <Box
        id="section17Scroll"
          sx={{
            display:{xs:"flex" ,md:"grid"},
            gridTemplateColumns: "repeat(3,1fr)",
            margin: { xs: "24px 0", md: "60px 0" },
            gap: { xs: "12px", md: "24px" },
            overflow:{xs:"scroll",md:"none"},
            maxWidth:{xs:"350px",md:"fit-content"} ,
            paddingRight:{xs:"24px",md:"0"}
          }}
        >
          {Array.from(Array(3)).map((_, i) => {
            return (
              <Box
                sx={{
                  border: `1px solid ${black}`,
                  borderRadius: "24px",
                  boxShadow: `0px 0px 4px 0px rgba(0, 0, 0, 0.25)`,
                  overflow: "hidden",
                  margin: "auto",
                  width: { xs: "", md: "fit-content" },
                  minWidth:{xs:"192px",md:'fit-content'}
                }}
                key={i}
              >
                <img
                  src={section17TextIcon}
                  alt="logo"
                  style={{ width: "100%", objectFit: "contain" }}
                />

                <Box
                  sx={{
                    display: "grid",
                    placeContent: "center",

                    padding: "0 8px",
                  }}
                >
                  <Typography
                    sx={{ color: black, margin: "0",
                    typography:{xs:"font_12_500", md:"font_20_600"}, }}
                  >
                    How to make a typography poster is Adobe Illustrator
                  </Typography>
                  <Typography
                    variant="font_12_400"
                    sx={{ paddingBottom: "8px" }}
                  >
                    {" "}
                    20 min Read
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            width:{xs:"100px", md:"200px"},
            border: "1px solid black",
            borderRadius: "16px",
            textAlign: "center",
            padding:{xs:"8px 0", md:"16px 0"},
            margin: "auto",
            typography:{xs:"font_12_500", md:"font_20_600"},
            display: "block",
            cursor:'pointer'
          }}
        >
          Read More
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section17;
