import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Snackbar } from '@mui/material';

const CreateCompany = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // Save company logic here
    setOpen(true);
    navigate('/company');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper style={{ padding: 16 }}>
      <TextField
        label="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal" 
        multiline
        rows={4} // You can adjust the number of rows as needed
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginTop: 16 }}
      >
        Save
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