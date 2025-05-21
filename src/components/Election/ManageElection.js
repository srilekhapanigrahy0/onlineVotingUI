import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';

const ManageElection = () => {
  const navigate = useNavigate();
  const [myData, setElectionsData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const location = useLocation();
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(!!location.state?.message);

  useEffect(() => {
    setElectionsData([
      {id:1, active:'active', companyName:'asd', electionName: 'panchayat', createdBy: 'Ram', createdOn: '2025-01-01', status: 'approved', group: 3, action: true},
      {id:2, active:'inactive', companyName:'vdf', electionName: 'student election', createdBy: 'Sita', createdOn: '2025-08-12', status: 'pending', group: 3, action: false}
    ]);

    // Show Snackbar if redirected after deletion
    if (location.state?.message) {
      setOpenSnackbar(true);
      
      setTimeout(() => {
        location.state = null;
        navigate('/election', { state: null }); // Reset state to avoid future Snackbar triggers
      }, 6000); 

    }
  }, [location, navigate]);
  
  const columns = [
    { field: 'companyName', headerName: 'Company Name', width: 200 },
    { field: 'electionName', headerName: 'Election Name', width: 200 },
    { field: 'createdBy', headerName: 'Created By', width: 120 },
    { field: 'createdOn', headerName: 'Created On', width: 120 },
    { field: 'active', headerName: 'Active', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
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
    { field: 'group', headerName: 'Groups', width: 75 },
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
  const handleConfirmDelete = () => {
    setElectionsData(myData.filter((x) => x.id !== deleteId));
    setOpenDialog(false);
    setDeleteId(null);
  };
  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      {location.state?.message && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            message={location.state.message}
          />
        )}
      
      <Button variant="contained" color="primary" onClick={() => navigate('/election/create')} style={{ margin: '16px 0' }}>
        Create New Election
      </Button>

      <DataGrid 
        rows={myData} 
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
        <DialogContent>Are you sure you want to delete this company?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default ManageElection;