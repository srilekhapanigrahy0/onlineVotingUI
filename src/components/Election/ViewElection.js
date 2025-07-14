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
import { getElectionDetailsById, deleteElection, updateElectionDetails } from '../../api/electionApi';

const ViewElection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [electionData, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch Election data on load
  useEffect(() => {
    const fetchElection = async () => {
      try {
        const data = await getElectionDetailsById(id);
        setElection(data);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to load election data.', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [id]);

  const handleApprove = async () => {
    try {
      const payload = {
        ...electionData,
        status: "A",
        approvedBy: userId,
        approvedDate: new Date(),
        comment: "Approved....",
        lastUpdateDate: new Date(),
      };

      await updateElectionDetails(id,payload);
      navigate('/election', {
        state: { message: 'Election Approved successfully!', severity: 'success' },
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update election. Please try again.', severity: 'error' });
    }
  };

  const handleEdit = () => {
    navigate(`/election/edit/${id}`);
  };
  
  const handleDelete = async () => {
    try {
      await deleteElection(id);
      navigate('/election', {
        state: { message: 'Election deleted successfully!', severity: 'success' },
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete election.', severity: 'error' });
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
        Election Details
      </Typography>

      {electionData && (
        <Box sx={{ mt: 2 }}>
          <Typography><strong>Company:</strong> {electionData.companyId}</Typography>
          <Typography><strong>Name:</strong> {electionData.name}</Typography>
          <Typography><strong>Start Date:</strong> {electionData.startDate}</Typography>
          <Typography><strong>End Date:</strong> {electionData.endDate}</Typography>
          <Typography><strong>Details:</strong> {electionData.details}</Typography>
          <Typography><strong>Created By:</strong> {electionData.createdBy}</Typography>
          <Typography><strong>Created Date:</strong> {electionData.createdDate}</Typography>
          <Typography><strong>Status:</strong> {electionData.status || 'P'}</Typography>
          <Typography><strong>Approved By:</strong> {electionData.approvedBy || 'N/A'}</Typography>
          <Typography><strong>Approved Date:</strong> {electionData.approvedDate || 'N/A'}</Typography>
          <Typography><strong>Comment:</strong> {electionData.comment || 'N/A'}</Typography>
          <Typography><strong>Last Update Date:</strong> {electionData.lastUpdateDate}</Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button variant="contained" onClick={handleEdit}>Edit</Button>
            <Button variant="contained" onClick={handleApprove}>Approve</Button>
            <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)}>
              Delete
            </Button>
          </Box>
        </Box>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this Election?</DialogContent>
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

export default ViewElection;