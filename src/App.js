import './App.css';
import React, { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/_layout/Header';
import Footer from './components/_layout/Footer';
import Sidebar from './components/_layout/Sidebar';
import Content from './components/_layout/Content';
import Breadcrumb from './components/_layout/Breadcrumb';

import CreateCompany from './components/Company/CreateCompany';
import ManageCompany from './components/Company/ManageCompany';
import ViewCompany from './components/Company/ViewCompany';

import ViewProfile from './components/Profile/ViewProfile';
import Login from './components/Security/Login/Login';

const theme = createTheme({
  spacing: 8, // Default spacing value
});

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
          <Header onSidebarToggle={handleSidebarToggle} />
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Breadcrumb /> {/* Add Breadcrumb component */}
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/view-profile" element={<ViewProfile />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/company" element={<ManageCompany />} />
                <Route path="/company/create" element={<CreateCompany />} />
                <Route path="/view-company/:id" element={<ViewCompany />} />
                {/* <Route path="/team" element={<Team />} />
                <Route path="/contact/email" element={<Email />} />
                <Route path="/contact/phone" element={<Phone />} />
                <Route path="/help/faq" element={<FAQ />} />
                <Route path="/help/support" element={<Support />} />
                <Route path="/feedback/submit" element={<SubmitFeedback />} />
                <Route path="/feedback/view" element={<ViewFeedback />} /> */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
            <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;