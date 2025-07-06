import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Snackbar, Input, Typography, Box, Alert, } from '@mui/material';
import { createElection } from '../../api/electionApi';

const CreateElection = () => {
  const userId = localStorage.getItem('userId');
  const [electionName, setElectionName] = useState('');
  const [electionNameError, setElectionNameError] = useState('');
  const [electionDetails, setelectionDetails] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const handleReset = () => {
    setElectionName('');
    setelectionDetails('');
  };

  const handleSubmit = async () => {
    if (!electionName.trim()) {
      setElectionNameError('Election Name is required');
      setSnackbarMessage('Election Name is required');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    setElectionNameError('');
    try {
      const payload = {
        companyId: "",
        name: electionName,
        startDate: "",
        endDate: "",
        details: "",
        createdBy: userId,
        createdDate: new Date(),
        status: "A",
        approvedBy: 0,
        approvedDate: new Date(),
        comment: "Approved by system",
        lastUpdateDate: new Date(),
      };

      const data = await createElection(payload);

      // Redirect with success message
      navigate('/election', {
        state: { message: 'Election created successfully!', severity: 'success' },
      });
    } catch (error) {
      setSnackbarMessage('Failed to create election. Please try again.');
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
        label="Election Name"
        value={electionName}
        onChange={(e) => setElectionName(e.target.value)}
        fullWidth
        required
        margin="normal"
        error={!!electionNameError}
        helperText={electionNameError}
      />

      <TextField
        label="Company Details"
        value={electionDetails}
        onChange={(e) => setelectionDetails(e.target.value)}
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
          Create Election
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

export default CreateElection;