import { API } from "./api";

const FETCH_ANNOUNCEMENTS_REQUEST = "FETCH_ANNOUNCEMENTS_REQUEST";
const FETCH_ANNOUNCEMENTS_SUCCESS = "FETCH_ANNOUNCEMENTS_SUCCESS";
const FETCH_ANNOUNCEMENTS_FAILURE = "FETCH_ANNOUNCEMENTS_FAILURE";

interface AnnouncementState {
  loading: boolean;
  announcements: any[];
  error: string | null;
}

const initialState: AnnouncementState = {
  loading: false,
  announcements: [],
  error: null,
};

export const announcementReducer = (
  state = initialState,
  action: any
): AnnouncementState => {
  switch (action.type) {
    case FETCH_ANNOUNCEMENTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_ANNOUNCEMENTS_SUCCESS:
      return { ...state, loading: false, announcements: action.payload };

    case FETCH_ANNOUNCEMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const fetchAnnouncements = () => {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_ANNOUNCEMENTS_REQUEST });

    try {
      const res = await fetch(API.announcements.get);
      const data = await res.json();

      dispatch({
        type: FETCH_ANNOUNCEMENTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_ANNOUNCEMENTS_FAILURE,
        payload: error.message,
      });
    }
  };
};
