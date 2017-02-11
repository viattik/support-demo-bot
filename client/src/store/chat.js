import ws from 'utils/ws';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_CHATS = 'UPDATE_CHATS';
export const ADD_MESSAGE = 'ADD_MESSAGE';

// ------------------------------------
// Actions
// ------------------------------------
export function chatUpdate (chats) {
  return {
    type    : UPDATE_CHATS,
    payload : { chats }
  }
}
export function messageAdd (id, text) {
  return {
    type    : ADD_MESSAGE,
    payload : { id, text }
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateChats = (chats) => {
  return (dispatch) => {
    return dispatch(chatUpdate(chats))
  };
}
export const addMessage = (id, text) => {
  return (dispatch) => {
    ws.send({ id, text });
    return dispatch(messageAdd(id, text))
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
function createReducer(initialState, reducerMap) {
  return (state = initialState, action = {}) => {
    const reducer = reducerMap[action.type];

    return reducer ? { ...state, ...reducer(state, action.payload) } : state;
  };
}
const initialState = {};
export default createReducer(initialState, {
  [UPDATE_CHATS]: (state, { chats }) => chats,
  [ADD_MESSAGE]: (state, { id, text }) => ({
    [id]: {
      ...state[id],
      messages: [
        ...state[id].messages,
        { sender: 1, text }
      ]
    }
  })
})
