import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField, Button, Paper, Snackbar, Typography, Box, Alert,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { fetchCompaniesByUserId } from '../../api/companyApi';
import { getElectionDetailsById, updateElectionDetails } from '../../api/electionApi';

const EditElection = () => {
  const { id } = useParams(); // Get election ID from URL
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [electionData, setElectionData] = useState(null);

  const [electionName, setElectionName] = useState('');
  const [electionDetails, setElectionDetails] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companies, setCompanies] = useState([]);

  const [electionNameError, setElectionNameError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [dateError, setDateError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchCompanies();
    fetchElectionDetails();
  }, [fetchCompanies, fetchElectionDetails]);

  const fetchCompanies = async () => {
    try {
      const response = await fetchCompaniesByUserId(userId);
      setCompanies(response);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  const fetchElectionDetails = async () => {
    try {
      const data = await getElectionDetailsById(id);
      setElectionData(data);

      setElectionName(data.name);
      setElectionDetails(data.details);
      setStartDate(data.startDate.slice(0, 10)); // Format to yyyy-mm-dd
      setEndDate(data.endDate.slice(0, 10));
      setSelectedCompany(data.companyId);
    } catch (error) {
      console.error('Failed to fetch election:', error);
    }
  };

  const handleSubmit = async () => {
    if (!electionName.trim()) {
      setElectionNameError('Election Name is required');
      showSnackbar('Election Name is required', 'error');
      return;
    }
    if (!selectedCompany) {
      setCompanyError('Company selection is required');
      showSnackbar('Please select a company', 'error');
      return;
    }
    if (!startDate || !endDate) {
      setDateError('Start and End dates are required');
      showSnackbar('Please select both start and end dates', 'error');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setDateError('Start date cannot be after end date');
      showSnackbar('Start date must be before end date', 'error');
      return;
    }

    try {
      const payload = {
        ...electionData,
        companyId: selectedCompany,
        name: electionName,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        details: electionDetails,
        lastUpdateDate: new Date(),
      };

      await updateElectionDetails(id,payload);
      navigate('/election', {
        state: { message: 'Election updated successfully!', severity: 'success' },
      });
    } catch (error) {
      showSnackbar('Failed to update election. Please try again.', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        Edit Election
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
        onChange={(e) => setElectionDetails(e.target.value)}
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Update Election
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

export default EditElection;