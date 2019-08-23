import { fetchTops } from '../../../redux/routines';

const initialState = {
    tops: [],
    error: '',
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
      case fetchTops.TRIGGER:
        return {
          ...state,
          loading: true,
        };
      case fetchTops.SUCCESS:
        return {
          ...state,
          tops: action.payload
        };
      case fetchTops.FAILURE:
        return {
          ...state,
          error: action.payload
        };
      case fetchTops.FULFILL:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
}