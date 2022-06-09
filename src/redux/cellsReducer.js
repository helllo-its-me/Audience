import {
  INITIAL_CELLS,
  ADD_CELL,
  RESET_CELLS,
  DELETE_CELL,
  DROP_ITEM_IN_CELL,
  DELETE_ITEM_FROM_CELL,
  CHANGE_CELL_NAME,
} from './types'
import uuid from 'react-uuid'
const initialState = {
  cells: {},
}

export const cellsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_CELLS:
      return {
        ...state,
        cells: { ...state.cells, [uuid()]: action.payload },
      }

    case RESET_CELLS:
      return { ...state, cells: {} }

    case ADD_CELL:
      return {
        ...state,
        cells: {
          ...state.cells,
          [uuid()]: { data: [], type: 0, name: 'Union block' },
        },
      }
    case DELETE_CELL:
      return { ...state, cells: action.payload }
    case DROP_ITEM_IN_CELL:
      return { ...state, cells: action.payload }
    case DELETE_ITEM_FROM_CELL:
      return { ...state, cells: action.payload }
    case CHANGE_CELL_NAME:
      return { ...state, cells: action.payload }

    default:
      return state
  }
}
