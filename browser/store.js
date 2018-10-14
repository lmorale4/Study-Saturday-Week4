import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

// Actions
const SET_STUDENTS = 'SET_STUDENTS';
const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';

// Action Creators
const setStudents = students => ({ type: SET_STUDENTS, students });

export const setSelectedStudent = student => ({
  type: SET_SELECTED_STUDENT,
  student,
});

const addStudent = student => ({ type: ADD_STUDENT, student });

// Thunks
export const fetchStudents = () => async dispatch => {
  try {
    const { data } = await axios.get('/student');
    dispatch(setStudents(data));
  } catch (err) {
    console.error(err);
  }
};

export const postStudent = student => async dispatch => {
  try {
    const { data } = await axios.post('/student', student);
    dispatch(addStudent(data));
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const initialState = {
  students: [],
  selectedStudent: {},
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return { ...state, students: action.students };
    case SET_SELECTED_STUDENT:
      return { ...state, selectedStudent: action.student };
    case ADD_STUDENT:
      return { ...state, students: [...state.students, action.student] };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);
