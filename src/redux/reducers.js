import { SET_USER_NAME } from './actions';

const initialState = {
  name: '',
  //create an initial state for the other variable.
}

function userReducer(state = initialState, action){
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
      //Create another case for another variable if necessary.
      default:
        return state;
  }
}

export default userReducer;