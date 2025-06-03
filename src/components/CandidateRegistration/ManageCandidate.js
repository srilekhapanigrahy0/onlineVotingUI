import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Tooltip, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Edit, Visibility, Delete } from '@mui/icons-material';
const ManageCandidate = () => {
    const navigate = useNavigate();
    const [Candidate, setCandidate] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [deleteId, setDeleteId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    
    const handleEdit = (id) => {
    navigate(`/CandidateRegistration/edit/${id}`);
    };
    const handleView = (id) => {
    navigate(`/CandidateRegistration/view/${id}`);
    };
    const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
    };

      useEffect(() => {
          // Updated company list with realistic names
          setCandidate([
            { id: 1, name: 'National Institute of Science and Technology', createdBy: 'Pranab', Groups: '3', createdOn: '2025-01-01', status: 'approved', rejectedReason: '', active: true },
            { id: 2, name: 'Infosys Pvt Ltd.', createdBy: 'Manisha', Groups: '3', createdOn: '2025-01-02', status: 'rejected', rejectedReason: 'Incomplete details', active: false },
            { id: 3, name: 'Manipal University', createdBy: 'Srilekha', Groups: '3', createdOn: '2025-01-03', status: 'pending', rejectedReason: '', active: true },
            { id: 4, name: 'Indian Govt.', createdBy: 'Aadarsha', Groups: '3', createdOn: '2025-01-04', status: 'approved', rejectedReason: '', active: false },
          ]);
        },
    ); 
    
    

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

      const columns = [
    { field: 'name', headerName: 'Candidate Name', width: 200 },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    { field: 'createdOn', headerName: 'Created On', width: 150 },
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
    {
        field: 'active',
        headerName: 'Active',
        width: 150,
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
    
    ]
    return (
        <div style={{ height: 400, width: '100%' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/CandidateRegistration/create')} style={{ margin: '16px 0' }}>
            Registration of New Candidate
        </Button>
        <DataGrid 
            rows={Candidate} 
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
        </div>
    );
};

export default ManageCandidate;