import React from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

const ViewCompany = () => {
  const { id } = useParams();
  const company = {
    id: 1,
    name: 'Company A',
    details: 'Details A',
  }; // Fetch company details based on ID

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Company Details</Typography>
      <Typography>ID: {company.id}</Typography>
      <Typography>Name: {company.name}</Typography>
      <Typography>Details: {company.details}</Typography>
    </Paper>
  );
};

export default ViewCompany;