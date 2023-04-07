import { useState,useRef,useEffect } from 'react'
import './App.css'
const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
      callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ref;
};
function App() {
  const [selectedCard,setSelectedCard] = useState(null)
  const card_mapper = {
    "para-medic": {name:"Para-Medic", questions:["Ask about Movies", "Ask about Plants", "Ask about Animals"]},
    "sigint":{name:"Sigint",questions:["Ask about ..."]},
    "the-boss":{name:"The Boss", questions:["Ask about..."]}
  }
  const ref = useOutsideClick(()=>setSelectedCard(null));
  //detect outside click ? 
  return (
    <div className="App">
      <div className='parent'>
        <div className="image-container"><img src={"src/img/Metal_Gear_Solid_logo_black.svg.png"} alt="logo"/></div>
        <div className='calling-cards' ref={ref}>
          {["para-medic","the-boss","sigint"].map((name)=><div className="calling-card" onClick={()=>setSelectedCard(name)}>{card_mapper[name].name}</div>)}
        </div>
        {selectedCard && card_mapper[selectedCard]? <div>{`List of ${card_mapper[selectedCard].name} Questions`}</div>:null}
      </div>
    </div>
  )
}

export default App
