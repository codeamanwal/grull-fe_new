import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
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

function Navbar() {
  const { lavender } = shades;
  const isDesktop = useMediaQuery("(min-width:500px)");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const scrollToSection =  useScrollToContactUsHook()


  return (
    <>
      {pathname !== "/coming-soon" && (
        <Grid
          sx={{
            height: "40px",
            width: "100%",
            background: "white",
            typography: "font_16_600",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          GRULL does not ask for any OTP for verification purpose.{" "}
        </Grid>
      )}
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
                  onClick={() => navigate('/coming-soon')}
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
            <Box
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
              onClick={() => scrollToSection()}
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
              onClick={() => scrollToSection()}
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
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Navbar;
