import { combineReducers } from 'redux'
import location from './location'
import chat from './chat'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location,
    chat,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
