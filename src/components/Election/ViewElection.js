import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getElectionDetailsById, deleteElection } from '../../api/electionApi';

const ViewCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch company data on load
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getElectionDetailsById(id);
        setCompany(data);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to load company data.', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  const handleEdit = () => {
    navigate(`/election/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteElection(id);
      navigate('/election', {
        state: { message: 'Company deleted successfully!', severity: 'success' },
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete company.', severity: 'error' });
    } finally {
      setConfirmOpen(false);
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
        Company Details
      </Typography>

      {company && (
        <Box sx={{ mt: 2 }}>
          <Typography><strong>Name:</strong> {company.name}</Typography>
          <Typography><strong>Logo:</strong> {company.logo || 'N/A'}</Typography>
          <Typography><strong>Created By:</strong> {company.createdBy}</Typography>
          <Typography><strong>Created Date:</strong> {company.createdDate}</Typography>
          <Typography><strong>Approved By:</strong> {company.approvedBy || 'N/A'}</Typography>
          <Typography><strong>Approved Date:</strong> {company.approvedDate || 'N/A'}</Typography>
          <Typography><strong>Comment:</strong> {company.comment || 'N/A'}</Typography>
          <Typography><strong>Last Update Date:</strong> {company.lastUpdateDate}</Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button variant="contained" onClick={handleEdit}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)}>
              Delete
            </Button>
          </Box>
        </Box>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this company?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ViewCompany;