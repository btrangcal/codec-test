import "./Discussions.css"
import conversations from './data/conversations'
const Discussions = ({ selectedCard, selectedQuestion ,handleSelectedTopicChange}) => {
    return (
        <div>
            <ul>
                {!!selectedCard && !!selectedQuestion ? conversations[selectedCard][selectedQuestion].map((topic) => <li onClick={()=>handleSelectedTopicChange(topic)} key={topic.name}><span>{topic.name}</span></li>) : null}
            </ul>
        </div>
    )
}

export default Discussions