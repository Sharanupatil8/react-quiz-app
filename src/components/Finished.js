import React from "react";

function Finished({ points, maxPosiiblePoints , highscore , dispatch}) {
  const percentage = (points / maxPosiiblePoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 60 && percentage < 80) emoji = "🥉";
  if (percentage >= 0 && percentage < 60) emoji = "🎉";
  if (percentage === 0) emoji = "🤦";

  return (
    <>
      <p className="result">
        <span> {emoji} </span>
        you scored <strong>{points}</strong> of {maxPosiiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore"> highscore of {highscore} points </p>

      <button onClick={() => dispatch({type : "restart"})} className="btn btn-restart">Restart quiz</button>
    </>
  );
}

export default Finished;
