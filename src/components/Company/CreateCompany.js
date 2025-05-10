import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Snackbar, Input, Typography } from '@mui/material';

const CreateCompany = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const handleReset = () => {
    setName('');
    setDetails('');
    setLogo(null);
    setLogoPreview(null);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setNameError('Company Name is required');
      return;
    }
    setNameError('');
    setOpen(true);
    navigate('/company');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedFormats.includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed.');
        return;
      }

      setLogo(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <TextField
        label="Company Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!nameError}
        helperText={nameError}
      />
      <TextField
        label="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      <Typography variant="subtitle1" style={{ marginTop: 16 }}>
        Upload Company Logo (JPG, JPEG, PNG)
      </Typography>
      <Input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileUpload}
      />
      
      {logoPreview && (
        <img src={logoPreview} alt="Logo Preview" style={{ width: '150px', marginTop: 10 }} />
      )}

      <Button 
        variant="contained" 
        color="warning" 
        onClick={handleReset} 
        style={{ marginTop: 16, marginRight: 16 }}
      >
        Reset
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSave} 
        style={{ marginTop: 16 }} 
        disabled={!name.trim()}
      >
        Create Company
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Company created successfully"
      />
    </Paper>
  );
};

export default CreateCompany;