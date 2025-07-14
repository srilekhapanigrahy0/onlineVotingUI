import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import WcIcon from '@mui/icons-material/Wc';
import { getAllElectionsByUserId } from '../../api/electionApi';
import Alert from '@mui/material/Alert';
import GroupsIconIcon from '@mui/icons-material/BlurLinear';

const ManageElection = () => {
  const [elections, setElections] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const location = useLocation();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error' | 'info' | 'warning'
  const [openSnackbar, setOpenSnackbar] = useState(!!location.state?.message);
  const navigate = useNavigate();

  useEffect(() => {
    loadElections();

    // Show Snackbar if redirected from other page
    if (location.state?.message) {
      setSnackbarMessage(location.state.message);
      setSnackbarSeverity(location.state.severity || 'success');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/election', { state: null }); // Reset state to avoid future Snackbar triggers
      }, 6000); 

    }
  }, [location.state]);

  const loadElections = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const data = await getAllElectionsByUserId(userId);
      console.log(data);
      setElections(data);
      setSnackbarMessage('Elections loaded successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to fetch elections:', err);
      setSnackbarMessage('Failed to load elections.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      // setError('Failed to load elections');
    } finally {
      // setLoading(false);
    }
  };

  const handleToggleActive = (id) => {
    setElections((prevElections) =>
      prevElections.map((election) =>
        election.id === id ? { ...election, active: !election.active } : election
      )
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return { color: 'green', cursor: 'pointer' };
      case 'rejected':
        return { color: 'red', cursor: 'pointer' };
      case 'pending':
        return { color: 'brown', cursor: 'pointer' };
      default:
        return { cursor: 'pointer' };
    }
  };

  const handleEdit = (id) => {
    navigate(`/election/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/election/view/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleGroupClick = (id) => {
     navigate(`/election/${id}/group`);
  };  
  const handleCandidateClick = (id) => {
     navigate(`/election/${id}/candidate`);
  };

  const handleConfirmDelete = () => {
    setElections(elections.filter((election) => election.id !== deleteId));
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };


  const columns = [
    { field: 'company_id', headerName: 'Company Name', width: 150 },
    { field: 'name', headerName: 'Election Name', width: 200 },
    { field: 'start_date', headerName: 'Start Date', width: 150 },
    { field: 'end_date', headerName: 'End Date', width: 150 },
    { field: 'created_by', headerName: 'Created By', width: 150 },
        {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        params.value === 'rejected' ? (
          <Tooltip title={params.row.rejectedReason}>
            <span style={getStatusStyle(params.value)}>{params.value}</span>
          </Tooltip>
        ) : (
          <span style={getStatusStyle(params.value)}>{params.value}</span>
        )
      ),
    },
    
    // {
    //   field: 'active',
    //   headerName: 'Active',
    //   width: 150,
    //   renderCell: (params) => (
    //     <Switch
    //       checked={params.value}
    //       onChange={() => handleToggleActive(params.row.id)}
    //       color="primary"
    //     />
    //   ),
    // },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 230,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton onClick={() => handleView(params.row.id)} color="secondary">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteClick(params.row.id)} color="error">
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Groups">
            <IconButton onClick={() => handleGroupClick(params.row.id)} color="error">
              <GroupsIconIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Candidates">
            <IconButton onClick={() => handleCandidateClick(params.row.id)} color="blue">
              <WcIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity} // 'success', 'error', 'warning', or 'info'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Button variant="contained" color="primary" onClick={() => navigate('/election/create')} style={{ margin: '16px 0' }}>
        Create New election
      </Button>
      <DataGrid 
        rows={elections} 
        columns={columns} 
        pageSize={pageSize} 
        sx={{
          fontSize: '12px',
          '.MuiDataGrid-cell': { py: 0.5, px: 1 },
          '.MuiDataGrid-columnHeader': { py: 0.5, maxHeight: '32px', minHeight: '32px', },
          '.MuiDataGrid-row': { maxHeight: '32px', minHeight: '32px', }, 
        }}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25]} 
        pagination 
        autoHeight
      />
        
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this election?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default ManageElection;