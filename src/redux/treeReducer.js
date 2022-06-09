import { FETCH_TREE } from './types'
const initialState = {
  tree: [],
}

export const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TREE:
      return { ...state, tree: action.payload }

    default:
      return state
  }
}
