import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finished from "./components/Finished";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining : null ,
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" ,  };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION};
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
      case "tick" : return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1, 
        status : state.secondsRemaining === 0 ? "finished" : state.status ,
      };
    // return {
    //   ...state,
    //   index: 0,
    //   answer: null,
    //   points: 0,
    //   highscore: 0,
    // };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const maxPosiiblePoints = questions
    .map((question) => question.points)
    .reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  const startQuiz = () => {
    dispatch({ type: "active" });
  };

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questions={questions} startQuiz={startQuiz} />
        )}
        {status === "active" && (
          <>
            <Progress
              questions={questions}
              index={index}
              points={points}
              maxPosiiblePoints={maxPosiiblePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                questions={questions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPosiiblePoints={maxPosiiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
