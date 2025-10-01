// API service functions
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});
//The following functions interact with the backend API to perform CRUD operations and fetch data.
// Student 
export const getStudents = async (filters?: any) => {const response = await api.get('/students', { params: filters });

  return response.data;
};

export const getStudentById = async (id: string) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const updateStudent = async (id: string, data: any) => {
  const response = await api.put(`/students/${id}`, data);
  return response.data;
};

// Communication  
export const getCommunications = async (studentId: string) => {

  const response = await api.get(`/communications/${studentId}`);
  return response.data;
};

export const addCommunication = async (data: any) => {
  const response = await api.post('/communications', data);
  return response.data;
};

// Notes 
export const getNotes = async (studentId: string) => {

  const response = await api.get(`/notes/${studentId}`);
  return response.data;
};

export const addNote = async (data: any) => {

  const response = await api.post('/notes', data);
  return response.data;
};

// Tasks 
export const getTasks = async (filters?: any) => {

  const response = await api.get('/tasks', { params: filters });
  return response.data;
};

export const createTask = async (data: any) => {

  const response = await api.post('/tasks', data);
  return response.data;
};

export const updateTask = async (id: string, data: any) => {

  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

// Insights A
export const getInsights = async () => {

  const response = await api.get('/insights');
  return response.data;
};

// Auth 
export const login = async (token: string) => {

  const response = await api.post('/auth/login', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const verifyToken = async () => {

  const response = await api.get('/auth/verify');
  return response.data;
};

export const logout = async () => {

  const response = await api.post('/auth/logout');
  return response.data;
};

export default api;


