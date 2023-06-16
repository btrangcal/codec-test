import './DetailedCard.css';
import Questions from './Questions.jsx';

import Discussions from './Discussions';




const DetailedCard = ({ name,questions,selectedQuestion,handleQuestionChange,selectedCard,handleSelectedTopicChange }) => {
    return (
      <div className="detailed-card">
        <div>{`List of ${name} Questions `}</div>
        <Questions 
          questions={questions} 
          handleQuestionChange={handleQuestionChange} 
          selectedQuestion={selectedQuestion}
          selectedCard={selectedCard}
        />
        <Discussions 
          selectedCard={selectedCard} 
          selectedQuestion={selectedQuestion}
          handleSelectedTopicChange={handleSelectedTopicChange}
        />
        {}
      </div>
    )
  }

  export default DetailedCard;