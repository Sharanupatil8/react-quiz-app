import React from "react";

function StartScreen({questions , startQuiz}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button onClick={() => startQuiz()}  className="btn btn-ui">Start Quiz</button>
    </div>
  );
}

export default StartScreen;
