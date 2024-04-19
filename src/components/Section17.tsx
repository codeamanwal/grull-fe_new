import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { shades } from "../helper/shades";
import section17TextIcon from "../assets/section17TextIcon.png";
import { useNavigate } from "react-router-dom";

function Section17() {
  const navigate = useNavigate();
  const { black } = shades;
  const bloglinks = [
    {
      "link":'https://blog.fiverr.com/post/getting-in-buyers-heads-as-told-by-top-buyers',
      "title":"Getting in buyers’ heads, as told by top buyers",
      "imgsrc":"https://assets-global.website-files.com/606a802fcaa89bc357508cad/64e62d602ee42d68c9b65e28_image2.jpg"
    },{
      "link":'https://blog.fiverr.com/post/the-psychology-behind-discounts-and-how-it-can-benefit-your-business',
      "title":"The psychology behind discounts and how it can benefit your business",
      "imgsrc":"https://assets-global.website-files.com/606a802fcaa89bc357508cad/64e62e20ee2ef482d3e618ce_image2%20(1).jpg"
    },{
      "link":'https://blog.fiverr.com/post/put-your-skills-to-the-test-in-fiverrs-new-ai-art-contest',
      "title":"Put your skills to the test in Fiverr’s new AI Art Contest",
      "imgsrc":"https://assets-global.website-files.com/606a802fcaa89bc357508cad/64d3d92681493e4875d6858e_header%20image-p-1080.png"
    }
  ];

  const handleBoxClick = (link: string) => {
    window.open(link, "_blank");
  };

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
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: "repeat(3,1fr)",
            margin: { xs: "24px 0", md: "60px 0" },
            gap: { xs: "12px", md: "24px" },
            overflow: { xs: "scroll", md: "none" },
            maxWidth: { xs: "350px", md: "fit-content" },
            paddingRight: { xs: "24px", md: "0" }
          }}
        >
          {bloglinks.map((blog, i) => (
            <Box
              key={i}
              onClick={() => handleBoxClick(blog.link)}
              sx={{
                border: `1px solid ${black}`,
                borderRadius: "24px",
                boxShadow: `0px 0px 4px 0px rgba(0, 0, 0, 0.25)`,
                overflow: "hidden",
                margin: "auto",
                width: { xs: "", md: "fit-content" },
                minWidth: { xs: "192px", md: "fit-content" },
                cursor:"pointer"
              }}
            >
              <img
                src={blog.imgsrc}
                alt="logo"
                style={{ width: "100%", objectFit: "contain" }}
              />
              <Box sx={{ display: "grid", placeContent: "center", padding: "0 8px" }}>
                <Typography
                  sx={{ color: black, margin: "0", typography: { xs: "font_12_500", md: "font_20_600" } }}
                >
                  {blog.title}
                </Typography>
                <Typography variant="font_12_400" sx={{ paddingBottom: "8px" }}>5 min Read</Typography>
              </Box>
            </Box>
          ))}
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
          onClick={()=>handleBoxClick('https://blog.fiverr.com/category/freelancers')}
        >
          Read More
          </Box>
      </Grid>
    </Grid>
  );
}

export default Section17;
