import * as TYPES from '../types';

const initialState = {
  services: []
};

const patientsReducer = (state = initialState, action) => {
  // get all patients data
  switch (action.type) {
    case TYPES.SET_SERVICES:
      return {
        ...state,
        services: action.data
      };
    default:
      return state;
  }
};

export default patientsReducer;
