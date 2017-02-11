import { connect } from 'react-redux'

import Chat from '../components/Chat'
import { addMessage } from 'store/chat';

const mapDispatchToProps = {
  addMessage
};

const mapStateToProps = (state, { params: { id } } ) => {
  return ({
    chat : state.chat[id]
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
