import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Paper, Snackbar, Input, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { getElectionDetailsById, updateElectionDetails } from '../../api/electionApi';


const EditElection = () => {
  const { id } = useParams(); 

  const navigate = useNavigate();

  const [electionData, setElectionData] = useState(null);
  const [formData, setFormData] = useState({ name: '', details: '' });
  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchElection = async () => {
    try {
      const data = await getElectionDetailsById(id);
      console.log(data)
      setElectionData(data);
      setFormData({ name: data.name, details: data.details || '' });
    } catch (error) {
      setSnackbarMessage('Failed to load Election data.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Election data on page load
  useEffect(() => {

    fetchElection();
  }, [id]);

  const handleReset = () => {
    if (electionData) {
      setFormData({ name: electionData.name, details: electionData.details || '' });
    }
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      setSnackbarMessage('Election name is required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const userId = localStorage.getItem('userId');
    if(userId != electionData.createdBy)
      electionData.status = "P";
    
    try {
      console.log(formData);
      console.log(electionData);
      const payload = {
        ...electionData,
        name: formData.name,
        //details: formData.details,
        lastUpdateDate: new Date(),
      };
      console.log("Final payload: ")
      console.log(payload);
      const data = await updateElectionDetails(id, payload);

      navigate('/election', {
        state: { message: 'Election updated successfully!', severity: 'success' },
      });
    } catch (error) {
      setSnackbarMessage('Failed to update Election. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        Edit Election
      </Typography>

      <TextField
        label="Election Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Election Details"
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update
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