import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Snackbar, Input, Typography, Box, Alert, } from '@mui/material';
import { createCompany } from '../../api/companyApi';

const CreateCompany = () => {
  const userId = localStorage.getItem('userId');
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [companyDetails, setCompanyDetails] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const handleReset = () => {
    setCompanyName('');
    setCompanyDetails('');
  };

  const handleSubmit = async () => {
    if (!companyName.trim()) {
      setCompanyNameError('Company Name is required');
      setSnackbarMessage('Company name is required');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    setCompanyNameError('');
    try {
      const payload = {
        name: companyName,
        logo: "",
        createdBy: userId,
        createdDate: new Date(),
        status: "A",
        approvedBy: 0,
        approvedDate: new Date(),
        comment: "Approved by system",
        lastUpdateDate: new Date(),
        //details: companyDetails,
      };

      const data = await createCompany(payload);

      // Redirect with success message
      navigate('/company', {
        state: { message: 'Company created successfully!', severity: 'success' },
      });
    } catch (error) {
      setSnackbarMessage('Failed to create company. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        Create Company
      </Typography>

      <TextField
        label="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        fullWidth
        required
        margin="normal"
        error={!!companyNameError}
        helperText={companyNameError}
      />

      <TextField
        label="Company Details"
        value={companyDetails}
        onChange={(e) => setCompanyDetails(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button 
        variant="outlined" 
        onClick={handleReset}>
          Reset
        </Button>

        <Button 
          variant="contained" 
          onClick={handleSubmit}>
          Create Company
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateCompany;