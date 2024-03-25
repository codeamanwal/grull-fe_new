
import { Grid } from "@mui/material";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8";
import Section9 from "./Section9";
import Section10 from "./Section10";
import Section11 from "./Section11";
import Section13 from "./Section13";
import Section14 from "./Section14";
import Section16 from "./Section16";
import Section17 from "./Section17";
import Section18 from "./Section18";
import Section19 from "./Section19";
import Footer from "./Footer";
import Section4 from "./Section4";
import Section15 from "./Section15";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const { hash, pathname } = useLocation();

  function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  useEffect(() => {
    if (hash) {
      scrollToSection(hash.replace("#", ""));
    }
  }, [hash]);

  return (
      <Grid sx={{ overflow: "hidden" }}>
        <Navbar />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
        <Section10 />
        <Section11 />
        <Section13 />
        <Section14 />
        <Section15 />
        <Section16 />
        <Section17 />
        <Section18 />
        <Section19 />
        <Footer />
      </Grid>
  );
}

export default Home;
