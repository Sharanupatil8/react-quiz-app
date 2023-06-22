import React from 'react'

function Options({question , dispatch , answer}) {
  const hasAnswered = answer !== null;
  return (
    <>
      {question.options.map((option, index) => {
        console.log(answer)
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
             hasAnswered ?  index === question.correctOption ? "correct" : "wrong" : ""
            }`}
            disabled = {hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={index}
          >
            {option}
          </button>
        );
      })}
    </>
  );
}

export default Options