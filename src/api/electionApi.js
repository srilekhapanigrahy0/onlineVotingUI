import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/elections'; 

export const getAllElectionsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllElectionsByUserId/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
