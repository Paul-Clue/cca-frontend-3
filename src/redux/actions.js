export const SET_USER_NAME = 'SET_USER_NAME';
//export const .....Create another variable if necessary.

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,

  });
};
// CREATE ANOTHER FUNCTION FOR A SECOND VARIABLE IF NECESSARY
// export const setName = name => dispatch => {
//   dispatch({
//     type: SET_USER_NAME,
//     payload: name,

//   });
// };