import { combineReducers } from 'redux'
import filterApplyReducer from './reducer'

export default combineReducers({
    data : filterApplyReducer,
})