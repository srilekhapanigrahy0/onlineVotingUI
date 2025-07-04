import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/companies'; 

export const fetchCompaniesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllCompanyByUserId/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${BASE_URL}/createCompany`, companyData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
