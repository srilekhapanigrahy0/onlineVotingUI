import React, { useState, useRef } from 'react';
import {
  Box, Button, Link, Snackbar, Dialog, DialogTitle,
  DialogContent, DialogActions, Table, TableBody, TableRow, TableCell, Alert
} from '@mui/material';
//import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

const VoterListUploader = () => {
  //const { election_group_id } = useParams();
  //const user_id = localStorage.getItem('user_id');

  const fileInputRef = useRef(null);
  const [parsedData, setParsedData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleFileUploadClick = () => fileInputRef.current.click();

  const validateData = (data) => {
    const errs = [];
    if (data.length > 2000) errs.push('Maximum 2000 records allowed.');
    const columns = data[0].length;

    for (let col = 0; col < columns; col++) {
      const colValues = data.map(row => row[col]);
      const valueSet = new Set();
      colValues.forEach((val, idx) => {
        if (!val || val.toString().trim() === '') errs.push(`Empty cell at row ${idx + 1}, col ${col + 1}`);
        if (valueSet.has(val)) errs.push(`Duplicate in column ${col + 1}: "${val}"`);
        valueSet.add(val);
      });
    }
    return errs;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const validations = validateData(rawData);
      setParsedData(rawData);
      setErrors(validations);
      setOpenModal(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleConfirm = async () => {
    try {
      // const payload = {
      //   election_group_id,
      //   user_id,
      //   rows: parsedData
      // };
      //await axios.post('/api/upload-excel', payload); // replace with your API
      setSnackbarMsg('Upload successful!');
      setUploadedData(parsedData);
      setOpenModal(false);
      setShowSnackbar(true);
    } catch (err) {
      setSnackbarMsg('Upload failed. Please try again.');
      setShowSnackbar(true);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setParsedData([]);
    setErrors([]);
    fileInputRef.current.value = '';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" onClick={handleFileUploadClick}>Upload Voter List</Button>
      <Link href="/sample.xlsx" download sx={{ ml: 2 }}>Download Sample List</Link>
      <input type="file" accept=".xlsx,.xls" ref={fileInputRef} hidden onChange={handleFileSelect} />

      {/* Uploaded Data Preview */}
      {uploadedData.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <h3>Uploaded Data:</h3>
          <Table size="small">
            <TableBody>
              {uploadedData.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Modal for Preview */}
      <Dialog open={openModal} maxWidth="lg" fullWidth>
        <DialogTitle>Excel Preview</DialogTitle>
        <DialogContent sx={{ maxHeight: '500px', overflowY: 'auto' }}>
          <Table size="small">
            <TableBody>
              {parsedData.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => {
                    const isEmpty = !cell || cell.toString().trim() === '';
                    const isDuplicate = errors.some(err => err.includes(`Duplicate`) && err.includes(`"${cell}"`) && err.includes(`col ${j + 1}`));
                    const bgColor = isEmpty || isDuplicate ? 'rgba(255, 0, 0, 0.3)' : 'inherit';
                    return (
                      <TableCell key={j} style={{ backgroundColor: bgColor }}>
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {errors.length > 0 && (
            <Box mt={2}>
              <Alert severity="error">
                {errors.map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirm} disabled={errors.length > 0}>Confirm</Button>
          <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar open={showSnackbar} autoHideDuration={4000} onClose={() => setShowSnackbar(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>{snackbarMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default VoterListUploader;