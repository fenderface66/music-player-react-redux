/**
 * songListItem
 *
 * Lists the name and the issue count of a repository
 */ 

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';
import ListItem from 'components/ListItem';
import SongData from './SongData';
import Wrapper from './Wrapper';
import A from 'components/A';
import Span from 'components/Span';
import { changeRating } from 'containers/App/actions';
import { playSong } from 'containers/HomePage/actions';
import { makeSelectFilteredItems } from 'containers/HomePage/selectors';


export class songListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    
  }
  
  returnTimeString(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds - minutes * 60;
    var timeString = minutes.toString() + ':' + seconds.toString();
    return timeString;
  }
  


  showItem(itemId) {
    var show = '';
    if (this.props.filteredItems === undefined) {
      return 'openItem';
    }
    
    this.props.filteredItems.map((filterId) => {
      
      if (itemId === filterId) {
        show = 'openItem';
      }
    })
    
    return show;
  }
  
  render() {
    
    const item = this.props.item;
    const index = this.props.index;
    const time = this.returnTimeString(this.props.item.duration);
    var showItem = this.showItem(item.id);
    
    // Put together the content of the repository          
    var content = (
      <Wrapper onClick={() => this.props.onPlaySong(item, index)} className={showItem}>
        <SongData>
          <ul className="no-list">
            <li className="title">
              {item.title}
            </li>
            <li className="artist">
              {item.artist}
            </li>
            <li className="genre hide-mobile">
              {item.genre}
            </li>
            <li className="rating">
              <span onClick={(e) => {
                  e.stopPropagation();
                  this.props.onChangeRating(false, item.id)
                  }
                }
              className="rating-btn">-</span>
                {item.rating}
              <span onClick={(e) => {
                  e.stopPropagation();
                  this.props.onChangeRating(true, item.id)
                  }
                } 
              className="rating-btn">+</span>
            </li>
            <li className="duration hide-tablet">
              {time}
            </li>
          </ul>
        </SongData>
      </Wrapper>

    );

    // Render the content into a list item
    return (
      <ListItem key={`song-list-item-${item.id}`} item={content} showClass={showItem}/>
    );
  }
}

songListItem.propTypes = {
  item: React.PropTypes.object,
  filteredItems: React.PropTypes.array
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeRating: (positive, id) => {
      dispatch(changeRating(positive, id));
    },

    onPlaySong: (song, index) => {
      dispatch(playSong(song, index));
    }
  };
}

const mapStateToProps = createStructuredSelector({
  filteredItems: makeSelectFilteredItems()
});

export default connect(mapStateToProps, mapDispatchToProps)(songListItem);
