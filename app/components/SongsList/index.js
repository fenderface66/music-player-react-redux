import React, { PropTypes } from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import songListItem from 'containers/songListItem';

function SongsList({ loading, error, songs, filteredItems }) {
  
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (songs !== false) {
    return <List items={songs} component={songListItem} filteredItems={filteredItems}/>;
  }

  return null;
}

SongsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  songs: PropTypes.any,
  filteredItems: PropTypes.array
};

export default SongsList;
