
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Snackbar, Input, Typography } from '@mui/material';

const CreateGroup = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [details, setDetails] = useState('');
    const navigate = useNavigate();
    const handleReset = () => {
    setName('');
    setDetails('');
  };
  const handleSave = () => {
    if (!name.trim()) {
      setNameError('Group Name is required');
      return;
    }
    setNameError('');
    //navigate('/ElectionGroup');
    navigate('/ElectionGroup', { state: { message: 'Election Group created successfully!' } });
  };
  
    return (
    <Paper style={{ padding: 16 }}>
      <TextField
        label="Group Name *"
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
        Create ElectionGroup
    </Button>
    </Paper>
    );
};

export default CreateGroup;