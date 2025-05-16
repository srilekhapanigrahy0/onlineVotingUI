import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { Snackbar } from '@mui/material';

const ManageElection = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(!!location.state?.message);
  const myData = [
    {id:1, active:'active', companyName:'asd', electionName: 'panchayat', createdBy: 'Ram', createdOn: '2025-01-01', status: 'approved', group: 3, action: true},
    {id:2, active:'inactive', companyName:'vdf', electionName: 'student election', createdBy: 'Sita', createdOn: '2025-08-12', status: 'pending', group: 3, action: false}
  ];

    useEffect(() => {
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
      { field: 'companyName', headerName: 'Company Name', width: 300 },
      { field: 'electionName', headerName: 'Election Name', width: 300 },
      { field: 'createdBy', headerName: 'Created By', width: 150 },
      { field: 'createdOn', headerName: 'Created On', width: 150 },
      { field: 'active', headerName: 'Active', width: 150 },
      
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
      { field: 'group', headerName: 'Groups', width: 150 }
    ];

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
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25]} 
        pagination 
        autoHeight
        />


    </div>
  );
};

export default ManageElection;