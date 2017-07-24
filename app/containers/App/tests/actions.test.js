import {
  LOAD_SONGS,
  LOAD_SONGS_SUCCESS,
  LOAD_SONGS_ERROR,
} from '../constants';

import {
  loadSongs,
  songsLoaded,
  songLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadSongs', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_SONGS,
      };

      expect(loadSongs()).toEqual(expectedResult);
    });
  });

  describe('songsLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_SONGS_SUCCESS,
        repos: fixture,
        username,
      };

      expect(songsLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('songLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_SONGS_ERROR,
        error: fixture,
      };

      expect(songLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
