import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import banner from "../../../assets/banner.webp"
const Banner = () => {
  return (
    <Box
      sx={{
        padding: "40px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            Learn Something New Today
          </Typography>
          <Typography variant="body1" gutterBottom>
            Explore our wide range of courses and enhance your skills.
          </Typography>
          <Button variant="contained" color="primary">
            Browse Courses
          </Button>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img
            src={banner}
            alt="Course Banner"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
