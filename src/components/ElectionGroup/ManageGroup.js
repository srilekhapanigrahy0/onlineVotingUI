import React, { useState, useEffect } from 'react';
import { Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { Button, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ManageGroup = () => {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(10);
    const [deleteId, setDeleteId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const myGroupData = 
    [
        {id:1, active:'active', groupName:'haridapadr group', electionName: 'panchayat', createdBy: 'Ram', createdOn: '2025-01-01', status: 'approved', group: 3, action: true,StartDate:'2-5-1200',EndDate: '5-6-1200'},
        {id:2, active:'inactive', groupName:'kumbhari village', electionName: 'panchayat', createdBy: 'Sita', createdOn: '2025-08-12', status: 'pending', group: 3, action: false,}
    ];
    const myTableColumns = [
        { field: 'groupName', headerName: 'Group Name', width: 150 },
        { field: 'createdBy', headerName: 'Created By', width: 180 },
        { field: 'createdOn', headerName: 'Created On', width: 150 },
        { field: 'active', headerName: 'Active', width: 100 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'StartDate', headerName: 'Start Date', width: 100 },
        { field: 'EndDate', headerName: 'End Date', width: 100 },

        
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
        navigate(`/electiongroup/edit/${id}`);
    };
    const handleView = (id) => {
        navigate(`/electiongroup/view/${id}`);
    };
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };

    


    return (
        <div style={{ height: 400, width: '100%' }}>
            
            <Button variant="contained" color="primary" onClick={() => navigate('/electiongroup/create')} style={{ margin: '16px 0' }}>
                Create New ElectionGroup
            </Button>

            <DataGrid 
                rows={myGroupData} 
                columns={myTableColumns} 
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

export default ManageGroup;