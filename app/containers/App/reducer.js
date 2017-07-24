/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_SONGS_SUCCESS,
  LOAD_SONGS,
  LOAD_SONGS_ERROR,
  CHANGE_RATING,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  id: '',
  userData: {
    songs: false,
  },
  ratingData: {
    positive: false,
    id: ''
  }
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SONGS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'songs'], false);
    case LOAD_SONGS_SUCCESS:
 
      return state
        .setIn(['userData', 'songs'], action.songs)
        .set('loading', false)
    case LOAD_SONGS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CHANGE_RATING:
      return state
        .setIn(['ratingData', 'id'], action.id)
        .setIn(['ratingData', 'positive'], action.positive)
        
    default:
      return state;
  }
}

export default appReducer;
