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
} from '../../../src/services/userService';
import { toast } from 'react-toastify';

//fetch for FORM
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCodeService('gender');
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
      let res = await getAllCodeService('Role');
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
      console.log(`res`, res);
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
      console.log(`res.data.data`, res.data.data);
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
      console.log(`data`, data);
      if (res?.data?.errorCode === 0) {
        toast.success('Save info doctor done!');
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.success('Save info doctor error!');

        dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
      }
    } catch (error) {
      toast.success('Save info doctor error!');

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
      console.log(`getAllCodeService res.data.data`, res.data.data);
      if (res?.data?.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data.data,
        });
        console.log(`FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS`, res.data.data);
      } else {
        dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED });
      console.log(`FETCH_ALLCODE_SCHEDULE_TIME_FAILED`, error);
    }
  };
};
