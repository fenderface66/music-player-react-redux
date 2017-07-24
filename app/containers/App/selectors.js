/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectSongs = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'songs'])
);

const makeSelectRating = () => createSelector(
  selectGlobal,
  (globalState) => {
    return {
      id: globalState.getIn(['ratingData', 'id']),
      positive: globalState.getIn(['ratingData', 'positive'])
    }
  }
);


const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectSongs,
  makeSelectLocationState,
  makeSelectRating,
};
