import { combineReducers } from 'redux'
import rootReducer from './rootReducers'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({ form: formReducer, root: rootReducer })
