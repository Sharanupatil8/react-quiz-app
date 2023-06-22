import React from 'react'

function NextButton({dispatch , answer , questions , index}) {
 if(answer === null) return ;

  if( index < questions.length -1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }


   if (index === questions.length - 1) {
     return (
       <button
         className="btn btn-ui"
         onClick={() => dispatch({ type: "finished" })}
       >
         Finish
       </button>
     );
   }
}

export default NextButton