import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer/index'

const composeEnhancers =
	(process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
let store = createStore(
	rootReducer,
	enhancer
)
export default store