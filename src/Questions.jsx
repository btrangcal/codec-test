import {Fragment} from 'react';

const Questions = ({questions,selectedQuestion,handleQuestionChange})=>{
    return(
        <Fragment>
            <select value={selectedQuestion } onChange={handleQuestionChange}> 
                {questions.map((question)=><option key={question} value={question}>{`Ask about ${question}...`}</option>)}
            </select>
        </Fragment>
        )
}

export default Questions;