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

const getTopDoctorHomeService = (limit) => {
  return axios.get(`http://localhost:8080/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get(`http://localhost:8080/api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
  return axios.post(`http://localhost:8080/api/save-info-doctors`, data);
};

const getDetailDoctorInfo = (inputId) => {
  return axios.get(
    `http://localhost:8080/api/get-detail-doctor-by-id?id=${inputId}`
  );
};

export {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailDoctorInfo,
};
