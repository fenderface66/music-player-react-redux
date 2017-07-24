/*
 * App Actions
 *
 * Actions change things in your application
 * Since this app uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 */

import {
  LOAD_SONGS,
  LOAD_SONGS_SUCCESS,
  LOAD_SONGS_ERROR,
  CHANGE_RATING,
} from './constants';

/**
 * Load the songs, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_SONGS
 */
export function loadSongs() {
  return {
    type: LOAD_SONGS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_SONGS_SUCCESS passing the repos
 */
export function songsLoaded(songs, username) {
  return {
    type: LOAD_SONGS_SUCCESS,
    songs,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_SONGS_ERROR passing the error
 */
export function songLoadingError(error) {
  return {
    type: LOAD_SONGS_ERROR,
    error,
  };
}

/**
 * Dispatched when rating has been changed
 *
 * @param  {object} rating The chosen rating
 *
 */
export function changeRating(positive, id) {
  return {
    type: CHANGE_RATING,
    positive,
    id
  };
}

