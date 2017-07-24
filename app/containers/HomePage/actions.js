/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this app uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 */

import {
  FILTER_SONGS,
  FILTERS_CREATED,
  CLEAR_FILTERS,
  CHANGE_SORTTYPE,
  CHANGE_PLAYSTATE,
  PLAY_SONG,
  MOVE_PROGRESS,
  PLAY_BUTTONCHANGE
} from './constants';


export function filterSongs(filter) {
  return {
    type: FILTER_SONGS,
    filter,
  };
}

export function clearFilters() {
  return {
    type: FILTER_SONGS,
  };
}

export function filtersCreated(filteredItems) {
  return {
    type: FILTERS_CREATED,
    filteredItems,
  };
}

export function changeSortType(sortType, sortDescending) {
  return {
    type: CHANGE_SORTTYPE,
    sortType,
    sortDescending
  };
}

export function changePlayState() {
  return {
    type: CHANGE_PLAYSTATE
  };
}

export function playSong(song, newIndex) {
  return {
    type: PLAY_SONG,
    song,
    newIndex
  };
}

export function moveProgress(progress) {
  return {
    type: MOVE_PROGRESS,
    progress,
  };
}


