import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { getAllElectionGroupsByElectionId } from '../../api/electionGroupApi';
import Alert from '@mui/material/Alert';
import GroupsIconIcon from '@mui/icons-material/BlurLinear';
import { useParams } from 'react-router-dom';


const ManageGroup = () => {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(10);
    const [deleteId, setDeleteId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const { electionId } = useParams();
    const [electionGroups, setElectionGroups] = useState([]);
    const location = useLocation();
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error' | 'info' | 'warning'
    const [openSnackbar, setOpenSnackbar] = useState(!!location.state?.message);

    useEffect(() => {
        loadElectionGroups();

        // Show Snackbar if redirected from other page
        if (location.state?.message) {
        setSnackbarMessage(location.state.message);
        setSnackbarSeverity(location.state.severity || 'success');
        setOpenSnackbar(true);
        setTimeout(() => {
            //navigate('/election', { state: null }); // Reset state to avoid future Snackbar triggers
        }, 6000); 

        }
    }, [location.state]);

  const loadElectionGroups = async () => {
    try {
      
      const data = await getAllElectionGroupsByElectionId(electionId);
      console.log(data)
      setElectionGroups(data);
      setSnackbarMessage('Election Groups loaded successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to fetch election groups:', err);
      setSnackbarMessage('Failed to load election groups.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      // setError('Failed to load elections');
    } finally {
      // setLoading(false);
    }
  };

  const handleToggleActive = (id) => {
    setElectionGroups((prevElections) =>
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

  const handleConfirmDelete = () => {
    setElectionGroups(electionGroups.filter((election) => election.id !== deleteId));
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };


  const columns = [
        { field: 'name', headerName: 'Group Name', width: 150 },
        { field: 'created_by', headerName: 'Created By', width: 180 },

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
    { field: 'start_date', headerName: 'Start Date', width: 100 },
        { field: 'end_date', headerName: 'End Date', width: 100 },
    
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
      width: 150,
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
        Create New election Group
      </Button>
      <DataGrid 
        rows={electionGroups} 
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

export default ManageGroup;