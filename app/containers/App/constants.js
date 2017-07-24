/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 */

export const LOAD_SONGS = 'react-redux-songs/Home/LOAD_SONGS';
export const LOAD_SONGS_SUCCESS = 'react-redux-songs/Home/LOAD_SONGS_SUCCESS';
export const LOAD_SONGS_ERROR = 'react-redux-songs/Home/LOAD_SONGS_ERROR';
export const DEFAULT_LOCALE = 'en';
export const CHANGE_RATING = 'react-redux-songs/RatingsBar/CHANGE_RATING';
