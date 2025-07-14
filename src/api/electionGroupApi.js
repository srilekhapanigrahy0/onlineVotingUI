import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/electionGroup'; 

export const getAllElectionGroupsByElectionId = async (electionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllElectionGroupsByElectionId/${electionId }`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};
