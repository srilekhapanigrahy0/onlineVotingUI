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

export const getCompanyDetailsById = async (companyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getCompanyDetailsById/${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCompanyDetails = async (companyId, companyData) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateCompanyDetails/${companyId}`, companyData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteCompany/${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};