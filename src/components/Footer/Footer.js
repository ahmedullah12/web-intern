import React from 'react';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f4f4f4', padding: '20px 0' }}>
      <Container>
        <Typography variant="h5" color={'chocolate'} gutterBottom>CourseLounge</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>About Us</Typography>
            <Typography variant="body1">Your course website aims to provide high-quality courses to help learners succeed.</Typography>
            <div style={{ marginTop: '10px' }}>
              <IconButton aria-label="facebook" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="linkedin" color="primary">
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Typography variant="body1">Email: info@example.com</Typography>
            <Typography variant="body1">Phone: +1234567890</Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
          © 2024 CourseLounge. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
