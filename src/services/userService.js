import axios from 'axios';

const handleLogin = (email, password) => {
  return axios.post('http://localhost:8080/api/login', { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`http://localhost:8080/api/get-all-user?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post(`http://localhost:8080/api/create-new-user`, data);
};

const deleteUserService = (userId) => {
  return axios.delete(`http://localhost:8080/api/delete-user`, {
    data: { id: userId },
  });
};

const editUserService = (inputData) => {
  return axios.put(`http://localhost:8080/api/edit-user`, inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`http://localhost:8080/api/allcode?type=${inputType}`);
};

export {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
};
