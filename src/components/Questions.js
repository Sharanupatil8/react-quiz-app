import React from "react";
import Options from "./Options";


function Questions({ question , dispatch , answer }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
     
      <div className="options">
        <Options question={question} dispatch={dispatch} answer = {answer} />
      </div>
    </div>
  );
}

export default Questions;
