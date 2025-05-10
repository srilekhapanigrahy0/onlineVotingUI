import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Tooltip, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { Snackbar } from '@mui/material';


const ManageCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(!!location.state?.message);
  const navigate = useNavigate();

  useEffect(() => {
    // Updated company list with realistic names
    setCompanies([
      { id: 1, name: 'National Institute of Science and Technology', createdBy: 'Pranab', Groups: '3', createdOn: '2025-01-01', status: 'approved', rejectedReason: '', active: true },
      { id: 2, name: 'Infosys Pvt Ltd.', createdBy: 'Manisha', Groups: '3', createdOn: '2025-01-02', status: 'rejected', rejectedReason: 'Incomplete details', active: false },
      { id: 3, name: 'Manipal University', createdBy: 'Srilekha', Groups: '3', createdOn: '2025-01-03', status: 'pending', rejectedReason: '', active: true },
      { id: 4, name: 'Indian Govt.', createdBy: 'Aadarsha', Groups: '3', createdOn: '2025-01-04', status: 'approved', rejectedReason: '', active: false },
    ]);

    // Show Snackbar if redirected after deletion
    if (location.state?.message) {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/company', { state: null }); // Reset state to avoid future Snackbar triggers
      }, 6000); 

    }
  }, [location, navigate]);

  const handleToggleActive = (id) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === id ? { ...company, active: !company.active } : company
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
    navigate(`/company/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/company/view/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    setCompanies(companies.filter((company) => company.id !== deleteId));
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const columns = [
    { field: 'name', headerName: 'Company Name', width: 300 },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    { field: 'createdOn', headerName: 'Created On', width: 150 },
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
    { field: 'Groups', headerName: 'Groups', width: 150 },
    {
      field: 'active',
      headerName: 'Active',
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={() => handleToggleActive(params.row.id)}
          color="primary"
        />
      ),
    },
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
      {location.state?.message && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={location.state.message}
        />
      )}

      <Button variant="contained" color="primary" onClick={() => navigate('/company/create')} style={{ margin: '16px 0' }}>
        Create New Company
      </Button>
      <DataGrid 
        rows={companies} 
        columns={columns} 
        pageSize={pageSize} 
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

export default ManageCompany;