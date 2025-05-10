import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ViewCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  // Example company details (Replace this with actual API data)
  const company = {
    id,
    name: 'Company A',
    details: 'Details A',
    createdBy: 'Pranab',
  };

  // Function to handle edit redirection
  const handleEdit = () => {
    navigate(`/company/edit/${id}`);
  };

  // Function to open delete confirmation popup
  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  // Function to confirm deletion and redirect to /company
  const handleConfirmDelete = () => {
    setOpenDialog(false);
    navigate('/company', { state: { message: 'Company deleted successfully!' } });
  };


  // Function to cancel deletion popup
  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Company Details</Typography>
      <Typography>ID: {company.id}</Typography>
      <Typography>Company Name: {company.name}</Typography>
      <Typography>Company Details: {company.details}</Typography>
      <Typography>Created By: {company.createdBy}</Typography>

      {/* Edit & Delete Buttons */}
      <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginTop: 16, marginRight: 16 }}>
        Edit Company
      </Button>
      <Button variant="contained" color="error" onClick={handleDeleteClick} style={{ marginTop: 16 }}>
        Delete Company
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this company?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ViewCompany;