import React from 'react'

function Progress({ questions, index, points, maxPosiiblePoints , answer }) {
  return (
    <header className="progress">
      <progress max={questions.length} value={index + Number(answer !== null)} min = "0"/>
      <p>
        Question <strong>{index + 1}</strong> / {questions.length}
      </p>
      <p>
        <strong>{points}</strong> / {maxPosiiblePoints}
      </p>
    </header>
  );
}

export default Progress