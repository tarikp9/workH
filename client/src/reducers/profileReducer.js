import {
  GET_PROFILE,
} from '../actions/types';

const initialState = {
  user: null,
  users: null
};

export default function(state = initialState, action) {
  
  switch (action.type) {
    
    case GET_PROFILE:
    console.log('Reducer ::  ' + action.payload);
      return {
        ...state,
        profile: action.payload,
        user: action.payload
      };
   
    default:
      return state;
  }
}
