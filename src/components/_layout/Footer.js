import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 'auto' }}>
      <Typography variant="body1" align="center">
        © 2025 My App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;