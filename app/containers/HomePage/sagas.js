/**
 * Gets the Songs from the server
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_SONGS, CHANGE_RATING } from 'containers/App/constants';
import { FILTER_SONGS, PLAY_SONG, CHANGE_PLAYSTATE } from 'containers/HomePage/constants';
import { songsLoaded, songLoadingError } from 'containers/App/actions';
import { makeSelectRating, makeSelectSongs } from 'containers/App/selectors';
import request from 'utils/request';
import { makeSelectSongFilter, makeSelectCurrentSong } from 'containers/HomePage/selectors';
import { filtersCreated, changePlayState, moveProgress } from 'containers/HomePage/actions';

/**
 * Song request/response handler
 */
export function* getSongs() {

  const requestURL = 'http://localhost:3000/api/getSongs';
  
  try {
    // Call our request helper (see 'utils/request')
    const songs = yield call(request, requestURL);
    yield put(songsLoaded(songs));
  } catch (err) {
    yield put(songLoadingError(err));
  }
}

/**
 * Ratings  handler
 */
export function* updateRating() {
  
  // Select rating from store
  const itemRating = yield select(makeSelectRating());
  
  const requestURL = `http://localhost:3000/api/updateRating?positive=${itemRating.positive}&id=${itemRating.id}`;

  try {
    // Call our request helper (see 'utils/request')
    const songs = yield call(request, requestURL);
    yield put(songsLoaded(songs));
  } catch (err) {
    yield put(songLoadingError(err));
  }
}

/**
 * Songs Filter handler
 */
export function* filterSongs() {
  
  var shownItems = []
  const songs = yield select(makeSelectSongs());
  const filter = yield select(makeSelectSongFilter());
  var availableFiltersLength;
  var availableFilters = {};
  
  for (var property in filter) {
    if (filter[property] !== '') {
      availableFilters[property] = filter[property];
    }
  }
  
  
  availableFiltersLength = Object.keys(availableFilters).length;
  //Check if any filters exist
  if (availableFiltersLength === 0) {
    songs.map((song) => {
      shownItems.push(song.id);
    })
  } else {
    songs.map((song) => {
    
    var passedFilterCount = 0;
        
    for (var filter in availableFilters) {
      var lowercase = song[filter].toLowerCase(); 
      
      //Count the number of filters that pass comparison 
      //and compare count to number of testable filters
      if (lowercase.indexOf(availableFilters[filter].toLowerCase()) !== -1) {
        passedFilterCount++;
      } 
    }
    
    if (passedFilterCount === availableFiltersLength) shownItems.push(song.id);
  })
  }
  
  
  
  try {
    yield put(filtersCreated(shownItems));
  } catch (err) {
    console.log(err);
  }
}

export function* clearFilters() {
  
  const shownItems = []
  const songs = yield select(makeSelectSongs());
  songs.map((song) => {
    shownItems.push({
      id: song.id
    })
  })
  
  try {

     yield put(filtersCreated(shownItems));
  } catch (err) {
    console.log(err);
  }
}


/**
 * Root sagas manage watcher lifecycle
 */
export function* ratingData() {
  
  const watcher = yield takeLatest(CHANGE_RATING, updateRating);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* filterData() {
  const watcher = yield takeLatest(FILTER_SONGS, filterSongs);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export function* songData() {
  // Watches for LOAD_SONGS actions and calls getSongs when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_SONGS, getSongs);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  songData,
  ratingData,
  filterData
];
