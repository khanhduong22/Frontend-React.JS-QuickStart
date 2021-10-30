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

const createBulkScheduleDoctor = (data) => {
  return axios.post(`http://localhost:8080/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `http://localhost:8080/api/get-schedule-doctors?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoDoctorByDoctorId = (doctorId) => {
  return axios.get(
    `http://localhost:8080/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`
  );
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(
    `http://localhost:8080/api/get-profile-doctor-by-id?doctorId=${doctorId}`
  );
};

const postPatientBookAppointment = (data) => {
  return axios.post(`http://localhost:8080/api/patient-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post(`http://localhost:8080/verify-booking`, data);
};

//specialty
const createNewSpecialty = (data) => {
  return axios.post(`http://localhost:8080/api/create-new-specialty`, data);
};

const getAllSpecialty = () => {
  return axios.get(`http://localhost:8080/api/get-specialty`);
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `http://localhost:8080/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

//clinic
const createNewClinic = (data) => {
  return axios.post(`http://localhost:8080/api/create-new-clinic`, data);
};

const getAllClinic = () => {
  return axios.get(`http://localhost:8080/api/get-clinic`);
};

const getAllDetailClinicById = (data) => {
  return axios.get(
    `http://localhost:8080/api/get-detail-clinic-by-id?id=${data.id}`
  );
};

//manage patient for doctoc

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `http://localhost:8080/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post(`http://localhost:8080/api/send-remedy`, data);
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
  createBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInfoDoctorByDoctorId,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
};
