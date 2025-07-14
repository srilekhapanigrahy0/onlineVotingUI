import React, { useEffect, useState } from 'react';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';
import { getAllElectionsByUserId } from '../../api/electionApi';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const dummyData = {
  '1': [
    { id: 1, name: 'Ravi Kumar', email: 'ravi@example.com', status: 'New' },
    { id: 2, name: 'Anjali Verma', email: 'anjali@example.com', status: 'Approved' }
  ],
  '2': [
    { id: 3, name: 'Manoj Singh', email: 'manoj@example.com', status: 'Rejected' },
    { id: 4, name: 'Sneha Rao', email: 'sneha@example.com', status: 'New' }
  ],
  '3': [
    { id: 1, name: 'Ravi Kumar', email: 'ravi@example.com', status: 'New' },
    { id: 2, name: 'Anjali Verma', email: 'anjali@example.com', status: 'Approved' }
  ],
  '4': [
    { id: 3, name: 'Manoj Singh', email: 'manoj@example.com', status: 'Rejected' },
    { id: 4, name: 'Sneha Rao', email: 'sneha@example.com', status: 'New' }
  ]
};



const ManageCandidate = () => {
  const { electionId: electionId } = useParams();
  const [elections, setElections] = useState([]);
  const [selectedElectionId, setSelectedElectionId] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const navigate = useNavigate();

  const loadElections = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const data = await getAllElectionsByUserId(userId);
      setElections(data)
      if (electionId) setSelectedElectionId(electionId);
      console.log(data);
    } catch (err) {
      console.error('Failed to fetch elections:', err);
    } finally {
    }
  };

  useEffect(() => {
    // Load all elections
    loadElections();

  }, []);


  useEffect(() => {
    if (selectedElectionId) {
      // Load candidates for the selected election
      setCandidates(dummyData[selectedElectionId] || []);
    }
  }, [selectedElectionId]);

  const handleElectionChange = (e) => {
    const electionId = e.target.value;
    setSelectedElectionId(electionId);
    // Replace dummyData with API call if available
    setCandidates(dummyData[electionId] || []);
  };

  const handleStatusUpdate = (id, newStatus, comment = '') => {
    const updated = candidates.map(c =>
      c.id === id ? { ...c, status: newStatus, comment } : c
    );
    setCandidates(updated);
    setRejectDialogOpen(false);
    setRejectComment('');
    setSelectedCandidateId(null);
    // axios.patch(`/api/candidates/${id}`, { status: newStatus, comment }); ← For backend
  };

  const openRejectDialog = (id) => {
    setSelectedCandidateId(id);
    setRejectDialogOpen(true);
  };

  const closeRejectDialog = () => {
    setRejectDialogOpen(false);
    setRejectComment('');
    setSelectedCandidateId(null);
  };

  const handleViewDetails = (candidateId) => {
    navigate(`/election/${selectedElectionId}/candidate/${candidateId}/view`);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>View Registered Candidates</Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Election</InputLabel>
        <Select value={selectedElectionId} label="Select Election" onChange={handleElectionChange}>
          {elections.map((el) => (
            <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedElectionId && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Candidate ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No Candidates registered yet.</TableCell>
                </TableRow>
              ) : (
                candidates.map((cand) => (
                  <TableRow key={cand.id}>
                    <TableCell>{cand.id}</TableCell>
                    <TableCell>{cand.name}</TableCell>
                    <TableCell>{cand.email}</TableCell>
                    <TableCell>{cand.status}</TableCell>
                    <TableCell>
                      {cand.status === 'New' && (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() => handleStatusUpdate(cand.id, 'Approved')}
                            sx={{ mr: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => openRejectDialog(cand.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="text" onClick={() => handleViewDetails(cand.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* 🚨 Reject Comment Dialog */}
      <Dialog open={rejectDialogOpen} onClose={closeRejectDialog}>
        <DialogTitle>Reject Candidate</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={3}
            value={rejectComment}
            onChange={(e) => setRejectComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRejectDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleStatusUpdate(selectedCandidateId, 'Rejected', rejectComment)}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCandidate;