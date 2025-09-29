// API service functions
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Student API functions
export const getStudents = async () => {
  // Implementation will go here
};

export const getStudentById = async (id: string) => {
  // Implementation will go here
};

export const updateStudent = async (id: string, data: any) => {
  // Implementation will go here
};

// Communication API functions
export const getCommunications = async (studentId: string) => {
  // Implementation will go here
};

export const addCommunication = async (studentId: string, data: any) => {
  // Implementation will go here
};

// Notes API functions
export const getNotes = async (studentId: string) => {
  // Implementation will go here
};

export const addNote = async (studentId: string, data: any) => {
  // Implementation will go here
};

export default api;