import {
  SET_USER_NAME,
  SET_USER_PHONE,
  SET_USER_ADDRESS,
  SET_USER_RELEASE,
  SET_USER_EMP_DATE,
  SET_USER_EMP_TYPE,
  SET_USER_WORK_HOURS,
  SET_MANAGER_LIST,
  SET_CASE_PROFILE
} from './actions';

const initialState = {
  storedInfoName: '',
  storedInfoPhone: '',
  storedInfoAddress: '',
  storedInfoRelease: '',
  storedInfoEmpDate: '',
  storedInfoEmpType: '',
  storedInfoWorkHours: '',
  storedInfoManagerList: '',
  storedInfoCaseProfile: '',
  //create an initial state for the other variable.
}

function userReducer(state = initialState, action){
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, storedInfoName: action.payload};
    case SET_USER_PHONE:
      return {...state, storedInfoPhone: action.payload};
    case SET_USER_ADDRESS:
      return {...state, storedInfoAddress: action.payload};
    case SET_USER_RELEASE:
        return {...state, storedInfoRelease: action.payload};
    case SET_USER_EMP_DATE:
        return {...state, storedInfoEmpDate: action.payload};
    case SET_USER_EMP_TYPE:
        return {...state, storedInfoEmpType: action.payload};
    case SET_USER_WORK_HOURS:
        return {...state, storedInfoWorkHours: action.payload};
    case SET_MANAGER_LIST:
        return {...state, storedInfoManagerList: action.payload};
    case SET_CASE_PROFILE:
        return {...state, storedInfoCaseProfile: action.payload};
      //Create another case for another variable if necessary.
      default:
        return state;
  }
}

export default userReducer;