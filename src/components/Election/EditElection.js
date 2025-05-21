import { TextField, Button, Paper, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const EditElection = () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [open, setOpen] = useState(false);
     const navigate = useNavigate();
    
    const handleSave = () => {
    // Save company logic here
    setOpen(true);
    navigate('/election');
  };

    
  return (
    <Paper style={{ padding: 16 }}>
      <TextField
        label="Election Name"
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
        color="warning"
        onClick={handleSave}
        style={{ marginTop: 16, marginRight: 16 }}
      >
        reset
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginTop: 16 }}
      >
        Create Election
      </Button>
    </Paper>
  );
};

export default EditElection;