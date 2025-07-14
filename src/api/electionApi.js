import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/elections'; 

export const getAllElectionsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllElectionsByUserId/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionDetailsById = async (electionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getElectionDetailsById/${electionId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createElection = async (electionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/createElection`, electionData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateElectionDetails = async (electionId, electionData) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateElectionDetails/${electionId}`, electionData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteElection = async (electionId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteElection/${electionId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};