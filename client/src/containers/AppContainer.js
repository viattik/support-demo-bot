import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider, connect } from 'react-redux'
import ws from 'utils/ws';
import { updateChats } from 'store/chat'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount() {
    ws.init((chats) => {
      this.props.updateChats(chats);
    });
  }

  componentWillUnmount() {

  }

  render () {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

const mapDispatchToProps = {
  updateChats,
};

const mapStateToProps = (state) => ({
  chat : state.chat
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
