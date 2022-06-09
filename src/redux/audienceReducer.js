import {
  FETCH_AUDIENCE,
  EDIT_AUDIENCE,
  SET_DISABLED,
  CANCEL_CHANGES,
  EDIT_FIELD_AUDIENCE,
} from './types'
const initialState = {
  audiences: [],
  currentStateAudience: [],
  newStateAudience: [],
  disabled: true,
}

export const audienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUDIENCE:
      return {
        ...state,
        currentStateAudience: action.payload,
        newStateAudience: action.payload,
      }
    case EDIT_AUDIENCE:
      return {
        ...state,
        currentStateAudience: action.payload,
        newStateAudience: action.payload,
      }
    case EDIT_FIELD_AUDIENCE:
      return {
        ...state,
        newStateAudience: action.payload,
      }

    case CANCEL_CHANGES:
      return {
        ...state,

        newStateAudience: state.currentStateAudience,
        disabled: false,
      }
    case SET_DISABLED:
      return { ...state, disabled: action.payload }
    default:
      return state
  }
}
