/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectSongFilter = () => createSelector(
  selectHome,
  (homeState) => homeState.get('songFilter')
);

const makeSelectFilteredItems = () => createSelector(
  selectHome,
  (homeState) => homeState.get('filteredItems')
);

const makeSelectSortObj = () => createSelector(
  selectHome,
  (homeState) => {
    return {
      sortType: homeState.getIn(['sortObj', 'sortType']),
      sortDescending: homeState.getIn(['sortObj', 'sortDescending'])
    }
  }
);

const makeSelectCurrentSong = () => createSelector(
  selectHome,
  (homeState) => {
    return {
      playState: homeState.getIn(['currentSongData', 'playState']),
      song: homeState.getIn(['currentSongData', 'song']),
      nextSongIndex: homeState.getIn(['currentSongData', 'nextSongIndex']),
      progress: homeState.getIn(['currentSongData', 'progress']),
      currentTime: homeState.getIn(['currentSongData', 'currentTime'])
    }
  }
);



export {
  selectHome,
  makeSelectUsername,
  makeSelectSongFilter,
  makeSelectFilteredItems,
  makeSelectSortObj,
  makeSelectCurrentSong
};
