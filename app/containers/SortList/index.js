/**
 * SortList
 *
 * Lists the name and the issue count of a repository
 */ 

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Wrapper from './Wrapper';
import A from 'components/A';
import Span from 'components/Span';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import { changeSortType } from 'containers/HomePage/actions';
import { makeSelectFilteredItems, makeSelectSortObj } from 'containers/HomePage/selectors';


export class SortList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    
  }
  
  renderCaretDirection(type) {
    if (type === this.props.sortObj.sortType) {
      if (this.props.sortObj.sortDescending === false) {
        return (
          <FaCaretUp />
        )
      } else {
        return (
          <FaCaretDown />
        )
      }
    }   
  }

  render() {
                
    return (   
      <Wrapper>
        <ul className="no-list">
          <li onClick={() => this.props.onSortItem('title', this.props.sortObj.sortDescending)}>
            <span>Title</span>
            {this.renderCaretDirection('title')}
          </li>
          <li onClick={() => this.props.onSortItem('artist', this.props.sortObj.sortDescending)}>
            <span>Artist</span>
            {this.renderCaretDirection('artist')}
          </li>
          <li onClick={() => this.props.onSortItem('genre', this.props.sortObj.sortDescending)} className="hide-mobile">
            <span>Genre</span>
            {this.renderCaretDirection('genre')}
          </li>
          <li onClick={() => this.props.onSortItem('rating', this.props.sortObj.sortDescending)}>
            <span>Rating</span>
            {this.renderCaretDirection('rating')}
          </li>          
          <li onClick={() => this.props.onSortItem('duration', this.props.sortObj.sortDescending)} className="hide-tablet">
            <span>Duration</span>
            {this.renderCaretDirection('duration')}
          </li>
        </ul>
      </Wrapper>

    );
  }
}

SortList.propTypes = {
  type: React.PropTypes.string,
  sortObj: React.PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSortItem: (sortType) => dispatch(changeSortType(sortType))

  };
}

const mapStateToProps = createStructuredSelector({
  sortObj: makeSelectSortObj()
});

export default connect(mapStateToProps, mapDispatchToProps)(SortList);
