import {combineReducers} from 'redux'
import app from './app'
import modal from './modal'

const rootReducer = combineReducers({
	app,
	modal
});
export default rootReducer