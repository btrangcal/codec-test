import React from "react";
import "./AudioPlayer.css";
const AudioPlayer = React.forwardRef(
  ({ src, autoPlay, onPlay, name, track }, audioElmRef) => {
    const getTrackTitle = (name, track) => {
      if (name && track) {
        return `${name} - ${track}`;
      } else {
        return "";
      }
    };
    return (
      <div className="audio-player-container">
        <audio
          src={src}
          controls={true}
          autoPlay={autoPlay}
          ref={audioElmRef}
          onPlay={onPlay}
        />
        <div>{getTrackTitle(name, track)}</div>
      </div>
    );
  }
);

export default AudioPlayer;
