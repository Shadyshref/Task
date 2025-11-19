import { API } from "./api";
const FETCH_QUIZES_REQUEST = "FETCH_QUIZES_REQUEST";
const FETCH_QUIZES_SUCCESS = "FETCH_QUIZES_SUCCESS";
const FETCH_QUIZES_FAILURE = "FETCH_QUIZES_FAILURE";

interface QuizState {
  loading: boolean;
  quizes: any[];
  error: string | null;
}

const initialState: QuizState = {
  loading: false,
  quizes: [],
  error: null,
};

export const quizReducer = (state = initialState, action: any): QuizState => {
  switch (action.type) {
    case FETCH_QUIZES_REQUEST:
      return { ...state, loading: true };

    case FETCH_QUIZES_SUCCESS:
      return { ...state, loading: false, quizes: action.payload };

    case FETCH_QUIZES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const fetchQuizes = () => {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_QUIZES_REQUEST });

    try {
      const res = await fetch(API.quizes.get);
      const data = await res.json();

      dispatch({ type: FETCH_QUIZES_SUCCESS, payload: data });
    } catch (err: any) {
      dispatch({ type: FETCH_QUIZES_FAILURE, payload: err.message });
    }
  };
};
