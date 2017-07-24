/**
 * Tests for HomePage sagas
 */

import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_SONGS } from 'containers/App/constants';
import { songsLoaded, songLoadingError } from 'containers/App/actions';

import { getSongs, githubData } from '../sagas';

const username = 'mxstbr';

/* eslint-disable redux-saga/yield-effects */
describe('getSongs Saga', () => {
  let getSongsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getSongsGenerator = getSongs();

    const selectDescriptor = getSongsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getSongsGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the songsLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First repo',
    }, {
      name: 'Second repo',
    }];
    const putDescriptor = getSongsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(songsLoaded(response, username)));
  });

  it('should call the songLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getSongsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(songLoadingError(response)));
  });
});

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_SONGS action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_SONGS, getSongs));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = githubDataSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = githubDataSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
