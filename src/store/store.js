import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './../reducers/index'

// module to manage history
export const history = createHistory()

const initialState = {}

// setting middleware
const middleware = [routerMiddleware(history)]
const composedEnhancers = compose(
    applyMiddleware(...middleware),
)

// create store and export
export default createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composedEnhancers
)