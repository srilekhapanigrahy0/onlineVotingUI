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
import Dashboard from './components/_layout/Content';
import Breadcrumb from './components/_layout/Breadcrumb';

import CreateCompany from './components/Company/CreateCompany';
import ManageCompany from './components/Company/ManageCompany';
import ViewCompany from './components/Company/ViewCompany';
import EditCompany from './components/Company/EditCompany';

import ManageElection from './components/Election/ManageElection';
import CreateElection from './components/Election/CreateElection';
import EditElection from './components/Election/EditElection';
import ViewElection from './components/Election/ViewElection';

import ManageGroup from './components/ElectionGroup/ManageGroup';
import CreateGroup from './components/ElectionGroup/CreateGroup';
import EditGroup from './components/ElectionGroup/EditGroup';
import ViewGroup from './components/ElectionGroup/ViewGroup';

import ManageCandidate from './components/CandidateRegistration/ManageCandidate';
import CreateCandidate from './components/CandidateRegistration/CreateCandidate';
import EditCandidate from './components/CandidateRegistration/EditCandidate';

import Homepage from './components/Homepage';
import UserLoginPage from './components/UserLogin';

import ViewProfile from './components/Profile/ViewProfile';
import Login from './components/Security/Login/Login';

const theme = createTheme({
  spacing: 8, // Default spacing value
});

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
          {
            (userId != null) &&
            <Header onSidebarToggle={handleSidebarToggle} />
          }
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Breadcrumb /> {/* Add Breadcrumb component */}
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/view-profile" element={<ViewProfile />} />
                <Route path="/user-login" element={<UserLoginPage />} />
                {/* <Route path="/login" element={<Login />} /> */}

                <Route path="/company" element={<ManageCompany />} />
                <Route path="/company/create" element={<CreateCompany />} />
                <Route path="/company/view/:id" element={<ViewCompany />} />
                <Route path="/company/edit/:id" element={<EditCompany />} />

                <Route path="/election" element={<ManageElection />} />
                <Route path="/election/create" element={<CreateElection />} />
                <Route path="/election/view/:id" element={<ViewElection />} />
                <Route path="/election/:id" element={<ViewElection />} />
                <Route path="/election/edit/:id" element={<EditElection />} />

                <Route path="/election/:electionId/group" element={<ManageGroup />} />
                <Route path="/election/:electionId/group/create" element={<CreateGroup />} />
                <Route path="/election/:electionId/group/view/:id" element={<ViewGroup />} />
                <Route path="/election/:electionId/group/edit/:id" element={<EditGroup />} /> 

                <Route path="/CandidateRegistration" element={<ManageCandidate />} />
                <Route path="/CandidateRegistration/create" element={<CreateCandidate />} />
                <Route path="/CandidateRegistration/edit/:id" element={<EditCandidate />} />                             
              
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
          {
            (userId != null) &&
            <Footer />
          }
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;