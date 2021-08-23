import cellsReducer from '../reducers/cells_reducer'
import bundlesReducer from '../reducers/bundle'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
})

export default reducers
export type RootState = ReturnType<typeof reducers>
