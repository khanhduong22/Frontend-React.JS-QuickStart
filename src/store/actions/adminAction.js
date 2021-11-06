import actionTypes from './actionTypes';

import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getAllSpecialty,
  getAllClinic,
} from '../../../src/services/userService';
import { toast } from 'react-toastify';

//fetch for FORM
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCodeService('GENDER');
      if (res?.data?.errorCode === 0) {
        dispatch(fetchGenderSuccess(res.data.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(`error`, error);
    }
  };
};
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('POSITION');
      if (res?.data?.errorCode === 0) {
        dispatch(fetchPositionSuccess(res.data.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(`error`, error);
    }
  };
};
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('ROLE');
      if (res?.data?.errorCode === 0) {
        dispatch(fetchRoleSuccess(res.data.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(`error`, error);
    }
  };
};

//Gender
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//Position
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//Role
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//create user
export const createUser = (data) => {
  return async (dispatch) => {
    try {
      let res = await createNewUserService(data);
      if (res?.data?.errorCode === 0) {
        toast.success('Create user success!!');
        dispatch(createUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(createUserFailed());
      }
    } catch (error) {
      dispatch(createUserFailed());
      console.log(`error`, error);
    }
  };
};
export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//fetch all user
export const fetchAllUsersStart = () => {
  return async (dispatch) => {
    try {
      let res = await getAllUsers('ALL');
      if (res?.data?.errorCode === 0) {
        dispatch(fetchAllUsersSuccess(res.data.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      dispatch(fetchAllUsersFailed());
      console.log(`error`, error);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

//delete user
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      let res = await deleteUserService(id);
      if (res?.data?.errorCode === 0) {
        toast.success('Delete done!');
        dispatch(fetchAllUsersStart());
        dispatch(deleteSuccess());
      } else {
        dispatch(deleteFailed());
      }
    } catch (error) {
      toast.error('Delete error!');
      console.log(`error`, error);
      dispatch(deleteFailed());
    }
  };
};
export const deleteSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

//edit user
export const editUser = (data) => {
  return async (dispatch) => {
    try {
      let res = await editUserService(data);
      if (res?.data?.errorCode === 0) {
        toast.success('Edit done!');
        dispatch(fetchAllUsersStart());
        dispatch(editSuccess());
      } else {
        dispatch(editFailed());
      }
    } catch (error) {
      toast.error('Edit error!');
      console.log(`error`, error);
      dispatch(editFailed());
    }
  };
};
export const editSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//fetch Doctor for HOmepage
export const fetchTopDoctor = () => {
  return async (dispatch) => {
    try {
      let res = await getTopDoctorHomeService('');
      if (res?.data?.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED });
      console.log(`FETCH_TOP_DOCTORS_FAILED`, error);
    }
  };
};

//fetch Doctor for HOmepage
export const fetchAllDoctors = () => {
  return async (dispatch) => {
    try {
      let res = await getAllDoctors();
      if (res?.data?.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      console.log(`FETCH_ALL_DOCTORS_FAILED`, error);
    }
  };
};

//save info Doctor for Admin page
export const saveDoctorInfo = (data) => {
  return async (dispatch) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res?.data?.errorCode === 0) {
        toast.success('Save info doctor done!');
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error('Save info doctor ERROR!');
        dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
      }
    } catch (error) {
      toast.error('Save info doctor ERROR!');

      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
      console.log(`SAVE_DETAIL_DOCTOR_FAILED`, error);
    }
  };
};

//fetch Time for Doctor Schedule
export const fetchAllScheduleTime = () => {
  return async (dispatch) => {
    try {
      let res = await getAllCodeService('TIME');
      if (res?.data?.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED });
      console.log(`FETCH_ALLCODE_SCHEDULE_TIME_FAILED`, error);
    }
  };
};

//fetch price-clinic-province for Doctor
export const getAllRequiredDoctorInfo = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });

      let resPrice = await getAllCodeService('PRICE');
      let resPayment = await getAllCodeService('PAYMENT');
      let resProvince = await getAllCodeService('PROVINCE');
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();

      if (
        resPrice?.data?.errorCode === 0 &&
        resPayment?.data?.errorCode === 0 &&
        resProvince?.data?.errorCode === 0 &&
        resSpecialty?.data?.errorCode === 0 &&
        resClinic?.data?.errorCode === 0
      ) {
        let data = {
          resPrice: resPrice.data.data,
          resPayment: resPayment.data.data,
          resProvince: resProvince.data.data,
          resSpecialty: resSpecialty.data.data,
          resClinic: resClinic.data.data,
        };

        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInfoFailed());
      console.log(`fetchRequiredDoctorInfoFailed`, error);
    }
  };
};

export const fetchRequiredDoctorInfoSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: data,
});
export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
