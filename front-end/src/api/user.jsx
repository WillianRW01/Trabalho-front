import api from './api';

export const createUser = async (user) => {
  const response = await api.post('api/v1/user', user);
  return response.data;
};

export const createUserAdmin = async (user) => {
  const response = await api.post('api/v1/user/admin', user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`api/v1/user/${id}`, user);
  return response.data;
};

export const updateUserAdmin = async (id, user) => {
  const response = await api.put(`api/v1/user/admin/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  return api.delete(`/api/v1/user/${id}`);
};

export const deleteUserAdmin = async (id) => {
  return api.delete(`/api/v1/user/admin/${id}`);
};

export const getUserByid = async (id) => {
  const response = await api.get(`api/v1/user/${id}`);
  return response.data;
};

export const getContext = async () => {
  const response = await api.get(`/api/v1/user/context`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('api/v1/user/');
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post('api/v1/user/login', { email, senha: password });
  return response.data;
};