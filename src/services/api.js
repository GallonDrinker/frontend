import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const login = (email, password) => axios.post(`${API_URL}/users/login`, { email, password });

export const register = (name, email, password) => axios.post(`${API_URL}/users/register`, { name, email, password });

export const getUsers = (token) => axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });

export const blockUser = (id, token) => axios.put(`${API_URL}/users/${id}/block`, {}, { headers: { Authorization: `Bearer ${token}` } });

export const deleteUser = (id, token) => axios.delete(`${API_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
