
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ViewGroup = () => {
    const { id } = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const election = {
    id,
    name: 'election A',
    details: 'Details A',
    createdBy: 'Pranab',
    };
     // Function to handle edit redirection
    const handleEdit = () => {
    navigate(`/electiongroup/edit/${id}`);
     };
     // Function to open delete confirmation popup
    const handleDeleteClick = () => {
    setOpenDialog(true);
     };
     // Function to cancel deletion popup
    const handleCancelDelete = () => {
    setOpenDialog(false);
    };
     const handleConfirmDelete = () => {
    setOpenDialog(false);
    navigate('/electiongroup', { state: { message: 'Election deleted successfully!' } });
  };
    return (
    <Paper style={{ padding: 16 }}>
        <Typography variant="h6">ElectionGroup Details</Typography>
        <Typography>ID: {election.id}</Typography>
        <Typography>Group Name: {election.name}</Typography>
        <Typography>Group Details: {election.details}</Typography>
        <Typography>Created By: {election.createdBy}</Typography>

    <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginTop: 16, marginRight: 16 }}>
        Edit election
    </Button>
    <Button variant="contained" color="error" onClick={handleDeleteClick} style={{ marginTop: 16 }}>
        Delete Election
    </Button>
{/* Delete Confirmation Dialog */}
    <Dialog open={openDialog} onClose={handleCancelDelete}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
        Are you sure you want to delete this election?
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error">Delete</Button>
    </DialogActions>
    </Dialog>

    </Paper>
    );
};

export default ViewGroup;