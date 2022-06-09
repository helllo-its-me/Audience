import { combineReducers } from 'redux'
import { treeReducer } from './treeReducer'
import { appReducer } from './appReducer'
import { audienceReducer } from './audienceReducer'
import { cellsReducer } from './cellsReducer'

export const rootReducer = combineReducers({
  tree: treeReducer,
  app: appReducer,
  audience: audienceReducer,
  cells: cellsReducer,
})
