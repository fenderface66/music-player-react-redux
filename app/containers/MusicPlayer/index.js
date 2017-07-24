/**
 * Music Player
 *
 * Plays the current song in the music player
 */ 

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactInterval from 'react-interval';
import Wrapper from './Wrapper';
import A from 'components/A';
import Span from 'components/Span';
import UIButton from './UIButton';
import ProgressBar from './ProgressBar';
import Progress from './Progress';
import FaPlay from 'react-icons/lib/fa/play';
import FaPause from 'react-icons/lib/fa/pause';
import FaBackward from 'react-icons/lib/fa/backward';
import FaForward from 'react-icons/lib/fa/forward';
import { changePlayState, moveProgress, playSong } from 'containers/HomePage/actions';
import { makeSelectFilteredItems, makeSelectCurrentSong } from 'containers/HomePage/selectors';
import { makeSelectSongs } from 'containers/App/selectors';


export class MusicPlayer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }
  
  renderPlayButton() {
    if (this.props.currentSong.playState) {
      return (
        <FaPause className="pause"/> 
      )
    } else {
      return (
        <FaPlay className="play"/>
      )
    }
  }
  
  changeSwitch(forward) {
    var newIndex;
    
    if (this.props.currentSong.song === null) {
      return;
    }
    
    newIndex = this.props.currentSong.nextSongIndex;
    
    if (forward) {
      newIndex += 1;
    } else {
    
      newIndex -= 1;
    }
    
    if (newIndex >= 0 && newIndex !== this.props.songs.length) {
      this.props.onPlaySong(this.props.songs[newIndex], newIndex);
    } 
    
    
  }
  
  returnTimeString(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds - minutes * 60;
    var timeString = minutes.toString() + ':' + seconds.toString();
    return timeString;
  }
  
  
  moveProgress() {
    var duration = this.props.currentSong.song.duration;
    var currentTime = this.props.currentSong.currentTime;
    var progress = this.props.currentSong.progress;
    var increment = ((this.progressBar.offsetWidth - 4) / duration);
    
    if (this.props.currentSong.playState && currentTime !== duration) {
      progress += increment;
      this.props.onMoveProgress(progress, false)
    }  else {
      this.changeSwitch(true);
    }
    
  }
  
  renderSongInfo() {
    var currentTimeString = this.returnTimeString(this.props.currentSong.currentTime);
    var durationTimeString = this.returnTimeString(this.props.currentSong.song.duration);
    return(
      <div className="info">
        <p>{currentTimeString}/{durationTimeString}</p>
        <p>{this.props.currentSong.song.title}</p>
        <p>{this.props.currentSong.song.artist}</p>
      </div>
    )
  }
  
  playButtonPress() {
    if (this.props.currentSong.song === null) {
      this.props.onPlaySong(this.props.songs[0], 0);
    } else {
      this.props.onChangePlayState()
    }
  } 


  render() {
    
    var progress = this.props.currentSong.progress; 
    var songInfo;
    if (this.props.currentSong.song !== null) {
      songInfo = this.renderSongInfo();
    }

    return (
      <Wrapper>
        <div className='ui-container'> 
          <UIButton onClick={() => this.changeSwitch(false)}>
            <FaBackward />
          </UIButton>
          <UIButton onClick={() => this.playButtonPress()}>
            {this.renderPlayButton()}
          </UIButton>
          <UIButton onClick={() => this.changeSwitch(true)}>
            <FaForward className="forward" />
          </UIButton>
            <ProgressBar innerRef={(comp) => { this.progressBar = comp }}>
              <ReactInterval timeout={1000} enabled={true}
                callback={() => {
                          if (this.props.currentSong.song !== null && this.props.currentSong.playState) {
                            this.moveProgress()
                          }
                         }}

                       />
              <Progress style={{width: progress + 'px'}} />
            </ProgressBar>
          
        </div>
        <div className="info-container">
          {songInfo}  
        </div>
      </Wrapper>

    );
  }
}

MusicPlayer.propTypes = {
  type: React.PropTypes.string,
  currentSong: React.PropTypes.object,
  songs: React.PropTypes.any
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePlayState: (force) => dispatch(changePlayState(force)),
    onMoveProgress: (progress, restart) => dispatch(moveProgress(progress, restart)),
    onPlaySong: (song, newIndex) => dispatch(playSong(song, newIndex))
  }
}

const mapStateToProps = createStructuredSelector({
  currentSong: makeSelectCurrentSong(),
  songs: makeSelectSongs()
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
