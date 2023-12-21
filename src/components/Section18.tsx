import { Box, Grid, Input, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { shades } from "../helper/shades";

function Section18() {
  const { lavender, black, white } = shades;

  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <Grid
      sx={{
        minHeight: { xs: "fit-content", md: "100vh" },
        width: "100vw",
        padding: "24px",
        display: "grid",
      }}
    >
      <Grid sx={{ width: { xs: "100%", md: "90%" }, margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Typography
            sx={{
              color: black,
              typography: { xs: "font_24_700", md: "font_48_800" },
            }}
          >
            Got Questions? Reach Out!
          </Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid black",
            background: "#121717",
            padding: { xs: "24px", md: "56px 80px" },
            borderRadius: "24px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
              gap: { xs: "12px 0", md: "24px" },
              margin: { xs: "12px 0", md: "24px 0" },
            }}
          >
            <Input
              type="text"
              placeholder="First Name*"
              sx={{
                background: "white",
                height: { xs: "24px", md: "64px" },
                borderRadius: "12px",
                padding: { xs: "16px 12px", md: "8px 40px" },
                typography: { xs: "font_12_500", md: "font_20_400" },
              }}
            />
            <Input
              type="text"
              placeholder="Last Name*"
              sx={{
                background: "white",
                height: { xs: "24px", md: "64px" },
                borderRadius: "12px",
                padding: { xs: "16px 12px", md: "8px 40px" },
                typography: { xs: "font_12_500", md: "font_20_400" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
              gap: { xs: "12px ", md: "24px" },
              //   margin: "24px 0",
            }}
          >
            <Box>
              <Input
                type="text"
                placeholder="Email*"
                sx={{
                  background: "white",
                  height: { xs: "24px", md: "64px" },
                  borderRadius: "12px",
                  padding: { xs: "16px 12px", md: "8px 40px" },
                  typography: { xs: "font_12_500", md: "font_20_400" },
                  width: "100%",
                }}
              />
              <Box sx={{ margin: { xs: "8px 0", md: "24px 0" } }}>
                <textarea
                  placeholder="I want help with..."
                  style={{
                    background: "white",
                    height: "180px",
                    borderRadius: "12px",
                    padding: isDesktop ? "24px 40px" : "8px 14px",
                    fontSize: isDesktop ? "20px" : "12px",
                    fontWeight: "400",
                    margin: "12px 0",
                    width: "100%",
                    display: isDesktop ? "none" : "block",
                  }}
                />

                <Typography
                  sx={{
                    color: "white",
                    typography: { xs: "font_12_600", md: "font_20_600" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  I want more help with-
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: { xs: "12px", md: "24px" },
                    margin: { xs: "8px", md: "12px 0" },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Input
                      type="radio"
                      sx={{
                        background: "white",
                        height: isDesktop ? "20px" : "8px",
                        width: isDesktop ? "20px" : "8px",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      sx={{
                        color: white,
                        typography: { xs: "font_12_600", md: "font_20_600" },
                      }}
                    >
                      My portfolio
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Input
                      type="radio"
                      sx={{
                        background: "white",
                        height: isDesktop ? "20px" : "8px",
                        width: isDesktop ? "20px" : "8px",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      sx={{
                        color: white,
                        typography: { xs: "font_12_600", md: "font_20_600" },
                      }}
                    >
                      Course enquiry
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Input
                      type="radio"
                      sx={{
                        background: "white",
                        height: isDesktop ? "20px" : "8px",
                        width: isDesktop ? "20px" : "8px",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      sx={{
                        color: white,
                        typography: { xs: "font_12_600", md: "font_20_600" },
                      }}
                    >
                      A new job posting
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Input
                      type="radio"
                      sx={{
                        background: "white",
                        height: isDesktop ? "20px" : "8px",
                        width: isDesktop ? "20px" : "8px",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      sx={{
                        color: white,
                        typography: { xs: "font_12_600", md: "font_20_600" },
                      }}
                    >
                      Others
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <textarea
              placeholder="I want help with..."
              style={{
                background: "white",
                height: "180px",
                borderRadius: "12px",
                padding: "24px 40px",
                fontSize: "20px",
                fontWeight: "400",
                display: isDesktop ? "block" : "none",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "right" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                typography: { xs: "font_12_700", md: "font_20_600" },
                background: lavender,
                color: black,
                textAlign: "center",
                borderRadius: "16px",
                width: { xs: "120px", md: "200px" },
                margin: { xs: "12px 0", md: "" },
                padding: { xs: "12px 0", md: "16px 0" },
              }}
            >
              Submit
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section18;
