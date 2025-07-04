import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Paper, Snackbar, Input, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { getCompanyDetailsById, updateCompanyDetails } from '../../api/companyApi';


const EditCompany = () => {
  const { id } = useParams(); 

  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState(null);
  const [formData, setFormData] = useState({ name: '', details: '' });
  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchCompany = async () => {
    try {
      const data = await getCompanyDetailsById(id);
      console.log(data)
      setCompanyData(data);
      setFormData({ name: data.name, details: data.details || '' });
    } catch (error) {
      setSnackbarMessage('Failed to load company data.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch company data on page load
  useEffect(() => {

    fetchCompany();
  }, [id]);

  const handleReset = () => {
    if (companyData) {
      setFormData({ name: companyData.name, details: companyData.details || '' });
    }
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      setSnackbarMessage('Company name is required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const userId = localStorage.getItem('userId');
    if(userId != companyData.createdBy)
      companyData.status = "P";
    
    try {
      console.log(formData);
      console.log(companyData);
      const payload = {
        ...companyData,
        name: formData.name,
        //details: formData.details,
        lastUpdateDate: new Date(),
      };
      console.log("Final payload: ")
      console.log(payload);
      const data = await updateCompanyDetails(id, payload);

      navigate('/company', {
        state: { message: 'Company updated successfully!', severity: 'success' },
      });
    } catch (error) {
      setSnackbarMessage('Failed to update company. Please try again.');
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
        Edit Company
      </Typography>

      <TextField
        label="Company Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Company Details"
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

export default EditCompany;