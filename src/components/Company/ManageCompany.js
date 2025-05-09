import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Tooltip, Switch } from '@mui/material';

const ManageCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Updated company list with realistic names
    setCompanies([
      { id: 1, name: 'National Institute of Science and Technology', createdBy: 'Pranab', Groups: '3', createdOn: '2025-01-01', status: 'approved', rejectedReason: '', active: true },
      { id: 2, name: 'Infosys Pvt Ltd.', createdBy: 'Manisha', Groups: '3', createdOn: '2025-01-02', status: 'rejected', rejectedReason: 'Incomplete details', active: false },
      { id: 3, name: 'Manipal University', createdBy: 'Srilekha', Groups: '3', createdOn: '2025-01-03', status: 'pending', rejectedReason: '', active: true },
      { id: 4, name: 'Indian Govt.', createdBy: 'Aadarsha', Groups: '3', createdOn: '2025-01-04', status: 'approved', rejectedReason: '', active: false },
    ]);
  }, []);

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 300 },
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
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/company/create')}
        style={{ margin: '16px 0' }}
      >
        Create New
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
    </div>
  );
};

export default ManageCompany;