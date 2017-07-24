/*
 * HomeReducer
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
  FILTER_SONGS,
  FILTERS_CREATED,
  CHANGE_SORTTYPE,
  CHANGE_PLAYSTATE,
  PLAY_SONG,
  MOVE_PROGRESS
} from './constants';

// The initial state of the App
const initialState = fromJS({
  songFilter: '',
  sortObj: {
    sortType: 'title',
    sortDescending: true
  },
  fitleredItems: [],
  playState: false,
  currentSongData: {
    playState: false,
    song: null,
    nextSongIndex: null,
    progress: 0,
    currentTime: 0
  }
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
      
    case FILTER_SONGS:
      return state
        .set('songFilter', action.filter)
    case FILTERS_CREATED:

    return state
      .set('filteredItems', action.filteredItems)
    case CHANGE_SORTTYPE:
    
    if (action.sortType === state.getIn(['sortObj', 'sortType'])) {
      return state
        .setIn(['sortObj', 'sortType'], action.sortType)
        .setIn(['sortObj', 'sortDescending'], !state.getIn(['sortObj', 'sortDescending']))
    } else {
      return state
        .setIn(['sortObj', 'sortType'], action.sortType)
        .setIn(['sortObj', 'sortDescending'], true)
    }   
    case CHANGE_PLAYSTATE:
      return state
        .setIn(['currentSongData', 'playState'], !state.getIn(['currentSongData', 'playState']))
      
   case PLAY_SONG:
    return state  
      .setIn(['currentSongData', 'playState'], true)
      .setIn(['currentSongData', 'song'], action.song)
      .setIn(['currentSongData', 'nextSongIndex'], action.newIndex)
      .setIn(['currentSongData', 'progress'], 0)
      .setIn(['currentSongData', 'currentTime'], 0);
      
   case MOVE_PROGRESS:
      return state  
        .setIn(['currentSongData', 'progress'], action.progress)
        .setIn(['currentSongData', 'currentTime'], (state.getIn(['currentSongData', 'currentTime']) + 1))
    
    default:
      return state;
  }
}

export default homeReducer;
