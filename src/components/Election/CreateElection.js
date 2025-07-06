import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Snackbar, Input, Typography, Box, Alert, } from '@mui/material';
import { createElection } from '../../api/electionApi';
import { fetchCompaniesByUserId } from '../../api/companyApi';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useEffect } from 'react';


const CreateElection = () => {
  const userId = localStorage.getItem('userId');
  const [electionName, setElectionName] = useState('');
  const [electionNameError, setElectionNameError] = useState('');
  const [electionDetails, setelectionDetails] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');



  const navigate = useNavigate();

  useEffect(() => {


    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetchCompaniesByUserId(userId); // Adjust based on your API
      setCompanies(response); // Ensure response is an array of companies
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  const handleReset = () => {
    setElectionName('');
    setelectionDetails('');
    setSelectedCompany('');
    setStartDate('');
    setEndDate('');

    setDateError('');
    setCompanyError('');
  };

  const handleSubmit = async () => {
    if (!electionName.trim()) {
      setElectionNameError('Election Name is required');
      setSnackbarMessage('Election Name is required');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    if (!selectedCompany) {
      setCompanyError('Company selection is required');
      setSnackbarMessage('Please select a company');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    if (!startDate || !endDate) {
      setDateError('Start and End dates are required');
      setSnackbarMessage('Please select both start and end dates');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setDateError('Start date cannot be after end date');
      setSnackbarMessage('Start date must be before end date');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setDateError('');
    setCompanyError('');
    setElectionNameError('');
    try {



      const payload = {
        companyId: selectedCompany,
        name: electionName,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        details: electionDetails,
        createdBy: userId,
        createdDate: new Date(),
        status: "P",
        approvedBy: null,
        approvedDate: null,
        comment: "",
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
        Create Election
      </Typography>

      <FormControl fullWidth margin="normal" error={!!companyError}>
        <InputLabel id="company-label">Select Company</InputLabel>
        <Select
          labelId="company-label"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          label="Select Company"
        >
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>



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
        label="Election Details"
        value={electionDetails}
        onChange={(e) => setelectionDetails(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={!!dateError}
      />

      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={!!dateError}
        helperText={dateError}
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