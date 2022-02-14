export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_PHONE = 'SET_USER_PHONE';
export const SET_USER_ADDRESS = 'SET_USER_ADDRESS';
export const SET_USER_RELEASE = 'SET_USER_RELEASE';

export const SET_USER_EMP_DATE = 'SET_USER_EMP_DATE';
export const SET_USER_EMP_TYPE = 'SET_USER_EMP_TYPE';
export const SET_USER_WORK_HOURS = 'SET_USER_WORK_HOURS';
export const SET_MANAGER_LIST = 'SET_MANAGER_LIST';
export const SET_CASE_PROFILE = 'SET_CASE_PROFILE';



export const setNamed = storedInfoName => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: storedInfoName,

  });
};
// CREATE ANOTHER FUNCTION FOR A SECOND VARIABLE IF NECESSARY
export const setPhoneNumbers = storedInfoPhone => dispatch => {
  dispatch({
    type: SET_USER_PHONE,
    payload: storedInfoPhone,

  });
};

export const setAddresss = storedInfoAddress => dispatch => {
  dispatch({
    type: SET_USER_ADDRESS,
    payload: storedInfoAddress,

  });
};

export const setRelease = storedInfoRelease => dispatch => {
  dispatch({
    type: SET_USER_RELEASE,
    payload: storedInfoRelease,

  });
};

export const setEmpDate = storedInfoEmpDate => dispatch => {
  dispatch({
    type: SET_USER_EMP_DATE,
    payload: storedInfoEmpDate,

  });
};

export const setEmpType = storedInfoEmpType => dispatch => {
  dispatch({
    type: SET_USER_EMP_TYPE,
    payload: storedInfoEmpType,

  });
};

export const setWorkHours = storedInfoWorkHours => dispatch => {
  dispatch({
    type: SET_USER_WORK_HOURS,
    payload: storedInfoWorkHours,

  });
};

export const setManagerList = storedInfoManagerList => dispatch => {
  dispatch({
    type: SET_MANAGER_LIST,
    payload: storedInfoManagerList,

  });
};

export const setCaseProfile = storedInfoCaseProfile => dispatch => {
  dispatch({
    type: SET_CASE_PROFILE,
    payload: storedInfoCaseProfile,

  });
};