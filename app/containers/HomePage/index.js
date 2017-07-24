/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSongs, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import SongsList from 'components/SongsList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection'; 
import H2 from 'components/H2';
import Form from './Form';
import Input from './Input';
import SelectInput from './SelectInput';
import Section from './Section';
import messages from './messages';
import { loadSongs } from '../App/actions';
import { makeSelectSongFilter, makeSelectFilteredItems, makeSelectSortObj } from './selectors';
import { filterSongs, clearFilters } from './actions';
import SortList from 'containers/SortList';
import MusicPlayer from 'containers/MusicPlayer';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.onSubmitForm();
  }
  
  sortList() {
    var sortedList;
    var type = this.props.sortObj.sortType;

    sortedList = this.props.songs.sort((a, b) => {
      if (a[type] < b[type]) {
        return -1;
      }
      if (a[type] > b[type]) {
        return 1;
      }
      return 0;
    })

    return sortedList;
  }
  
  clearFilters() {
    this.titleFilter.value = "";
    this.artistFilter.value = "";
    this.selectFilter.value = "";
  }

  render() {
    var sortedSongs;
    
    if (this.props.songs !== false) {
      sortedSongs = this.sortList();
      if (this.props.sortObj.sortDescending === false) {
        sortedSongs = sortedSongs.reverse();
      }
    } else {
      sortedSongs = this.props.songs;
    }
    
    const songsListProps = {
      loading: this.props.loading,
      error: this.props.error,
      songs: sortedSongs,
      filteredItems: this.props.filteredItems
    };
    
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'Search your songs here' },
          ]}
        /> 
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p className="header-des">
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <MusicPlayer />
            <Form onSubmit={this.props.onfilterSongs}>
      
              <fieldset>
                <label>Title:</label>

                <Input
                  id="title-filter"
                  type="text"
                  placeholder="Fade"
                  name="title"
                  onChange={this.props.onfilterSongs}
                  innerRef={(comp) => { this.titleFilter = comp }}
                />

              </fieldset>
      
              <fieldset>
                <label>Artist:</label>

                <Input
                  id="artist-filter"
                  type="text"
                  placeholder="Solu Music"
                  name="artist"
                  onChange={this.props.onfilterSongs}
                  innerRef={(comp) => { this.artistFilter = comp }}
                />

              </fieldset>
      
              <fieldset>
                <label>Genre</label>
                <SelectInput name="genre-filter" innerRef={(comp) => { this.selectFilter = comp }}>
                  <option value=''>Please Select A Genre</option>
                  <option value="house">House</option>
                  <option value="trance">Trance</option>
                  <option value="pop">Pop</option>
                  <option value="rock">Rock</option>
                </SelectInput>
              </fieldset>
              <div className="btns">
                <input type="submit" value="Filter" />
                <button onClick={() => this.clearFilters()}>Clear</button>
              </div>
            </Form>
            <SortList />
            <SongsList {...songsListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  songs: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  filteredItems: React.PropTypes.array,
  sortObj: React.PropTypes.object
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadSongs());
    },
    
    onClearFilter: () => {
      dispatch(clearFilters());
    },
    
    onfilterSongs: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      
      if (evt.target.tagName === 'FORM')  {
        dispatch(filterSongs({
          title: evt.target.querySelector('input[name="title"]').value,
          artist: evt.target.querySelector('input[name="artist"]').value,
          genre: evt.target.querySelector('select').value
        }))
      } 
      
    }
  };
}

const mapStateToProps = createStructuredSelector({
  songs: makeSelectSongs(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  songFilter: makeSelectSongFilter(),
  filteredItems: makeSelectFilteredItems(),
  sortObj: makeSelectSortObj()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
