import { useState, useRef, useEffect, forwardRef } from "react";
import "./App.css";
import MenuCards from "./MenuCards";
import DetailedCard from "./DetailedCard.jsx";
import Logo from "./Logo.jsx";
import card_mapper from "./data/card_mapper";
import AudioPlayer from "./AudioPlayer";
const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
};

const AudioContainer = (props) => {
  return(<div className="audio-container">{props.children}</div>);
  
};

const AudioWaves = forwardRef((props, ref) => (
  <div>
    <canvas ref={ref} width={500} height={200} />
  </div>
));
function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useOutsideClick(() => {
    console.log("handle outside click");
    setSelectedCard(null);
    setSelectedQuestion("");
    setSelectedTopic(null);
    setIsPlaying(false);
  });
  const audioElmRef = useRef(null); //ref for audio
  const source = useRef();
  const canvasRef = useRef();
  const analyzer = useRef();
  const [animationFrameValue, setAnimationFrameValue] = useState(null);
  //detect outside click ?
  const handleMenuCardClick = (cardName) => {
    console.log(cardName);
    setSelectedCard(cardName);
    setSelectedQuestion(card_mapper[cardName].questions[0]);
  };
  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  const handleSelectedTopicChange = (topic) => {
    setSelectedTopic(topic);
    setIsPlaying(false);
  };

  const visualizeData = () => {
    setAnimationFrameValue(window.requestAnimationFrame(visualizeData)); //requestAnimationFrame returns a long int value
    if (audioElmRef.current.paused) {
      return cancelAnimationFrame(animationFrameValue);
    }
    const audioData = new Uint8Array(140);
    analyzer.current.getByteFrequencyData(audioData);
    const bar_width = 3;
    let start = 0;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (let i = 0; i < audioData.length; i++) {
      start = i * 4; //compute x coordinate where we would draw
      //create a gradient for the whole canvas
      let gradient = ctx.createLinearGradient(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      gradient.addColorStop(0.2, "#4c4c37"); //lighter
      gradient.addColorStop(0.5, "#2c2c14"); //medium
      gradient.addColorStop(1.0, "#242c1c"); //darkest
      ctx.fillStyle = gradient;
      ctx.fillRect(start, canvasRef.current.height, bar_width, -audioData[i]);
    }
  };

  const handleAudioPlay = () => {
    let audioContext = new AudioContext();
    if (!source.current) {
      source.current = audioContext.createMediaElementSource(
        audioElmRef.current
      );
      analyzer.current = audioContext.createAnalyser();
      source.current.connect(analyzer.current);
      analyzer.current.connect(audioContext.destination);
    }
    visualizeData();
  };

  return (
    <div className="App">
      <div className="parent" ref={ref}>
        <Logo />
        <div className="card-container">
          <MenuCards handleMenuCardClick={handleMenuCardClick}/>
        </div>
        {selectedCard && card_mapper[selectedCard] ? (
          <DetailedCard
            selectedCard={selectedCard}
            name={card_mapper[selectedCard].name}
            questions={card_mapper[selectedCard].questions}
            selectedQuestion={selectedQuestion}
            handleQuestionChange={handleQuestionChange}
            handleSelectedTopicChange={handleSelectedTopicChange}
          />
        ) : null}
        <AudioContainer>
          <AudioPlayer
            src={selectedTopic && selectedTopic.file ? selectedTopic.file : ""}
            ref={audioElmRef}
            autoPlay={isPlaying}
            onPlay={handleAudioPlay}
            name={card_mapper[selectedCard] && card_mapper[selectedCard].name?card_mapper[selectedCard].name:"" }
            track={selectedTopic && selectedTopic.name? selectedTopic.name:""}
          />
          <AudioWaves ref={canvasRef} />
        </AudioContainer>
      </div>
    </div>
  );
}

export default App;
