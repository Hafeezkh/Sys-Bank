import axios from 'axios';

export const baseURL = 'http://localhost:8080'; 

export const api = axios.create({
  baseURL,
});

export const fetchUsers = async () => {
  try {
    const url = `/api/users`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addUser = async (newUser) => {
  try {
    const url = `/api/users`;
    const response = await api.post(url, newUser);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};