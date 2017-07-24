/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FILTER_SONGS = 'react-redux-songs/Home/FILTER_SONGS';
export const FILTERS_CREATED = 'react-redux-songs/Home/FILTERS_CREATED';
export const CLEAR_FILTERS = 'react-redux-songs/Home/CLEAR_FILTERS';
export const CHANGE_SORTTYPE = 'react-redux-songs/Home/CHANGE_SORTTYPE';
export const CHANGE_PLAYSTATE = 'react-redux-songs/Home/CHANGE_PLAYSTATE';
export const PLAY_SONG = 'react-redux-songs/Home/PLAY_SONG';
export const MOVE_PROGRESS = 'react-redux-songs/Home/MOVE_PROGRESS';

