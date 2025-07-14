import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  TextField, Button, Typography, IconButton, Box,
  Paper, Grid
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import axios from 'axios';
import { getElectionDetailsById } from '../../api/electionApi';

const CandidateRegistration = () => {
  const { electionId } = useParams();
  const [electionName, setElectionName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
    photo: null,
    documents: [],
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const fetchElection = async () => {
          try {
            const data = await getElectionDetailsById(electionId);
            setElectionName(data.name)
          } catch (error) {
            //setSnackbar({ open: true, message: 'Failed to load election data.', severity: 'error' });
          } finally {
            //setLoading(false);
          }
        };

        fetchElection();  
    
  }, [electionId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const photo = e.target.files[0];
    setFormData({ ...formData, photo });
    setPhotoPreview(URL.createObjectURL(photo));
  };

  const handleDocumentUpload = (e) => {
    const newDocs = Array.from(e.target.files);
    setFormData({ ...formData, documents: [...formData.documents, ...newDocs] });
  };

  const removeDocument = (index) => {
    const docs = [...formData.documents];
    docs.splice(index, 1);
    setFormData({ ...formData, documents: docs });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      details: '',
      photo: null,
      documents: [],
    });
    setPhotoPreview(null);
  };

  const handleSubmit = () => {
    const submission = new FormData();
    submission.append('name', formData.name);
    submission.append('email', formData.email);
    submission.append('details', formData.details);
    submission.append('photo', formData.photo);
    formData.documents.forEach((doc, index) =>
      submission.append(`documents[${index}]`, doc)
    );

    axios.post(`/api/elections/${electionId}/candidates`, submission)
      .then(() => alert('Submitted successfully!'))
      .catch(err => console.error(err));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Register for: {electionName}</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="name" label="Name" fullWidth value={formData.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="email" label="Email" fullWidth value={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="details"
              label="Details"
              multiline
              rows={4}
              fullWidth
              value={formData.details}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
            >
              Upload Photo
              <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
            </Button>
            {photoPreview && <img src={photoPreview} alt="Preview" height="100" style={{ marginTop: '10px' }} />}
          </Grid>
          <Grid item xs={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
            >
              Attach Document(s)
              <input type="file" hidden multiple onChange={handleDocumentUpload} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {formData.documents.map((doc, index) => (
              <Paper key={index} sx={{ p: 1, mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{doc.name}</Typography>
                <IconButton onClick={() => removeDocument(index)}><Delete /></IconButton>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleReset}>Reset</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CandidateRegistration;