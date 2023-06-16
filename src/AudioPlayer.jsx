import React from 'react'
const AudioPlayer = React.forwardRef(({src,autoPlay, onPlay},audioElmRef) =>(
     <div>
        <audio 
                src={src} 
                controls={true} 
                autoPlay={autoPlay} 
                ref={audioElmRef} 
                onPlay={onPlay} 
        />
     </div>
));

  export default AudioPlayer;