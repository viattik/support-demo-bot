import React from 'react'
import { Link } from 'react-router'
import './ChatList.scss'
import { connect } from 'react-redux'


export class ChatList extends React.Component {

  renderItem(id, item) {
    return (
      <Link to={`/chat/${id}`} className="btn btn-primary" activeClassName='active' key={id}>
        {item.from.first_name} {item.from.last_name}
      </Link>
    )
  }
  render() {
    const { chat } = this.props;
    const ids = Object.keys(chat);
    return (
      <div className="chat-list">
        <h3>Active chats</h3>
        <div>
          { ids.map((id) => this.renderItem(id, chat[id])) }
          { !ids.length && 'No active chats' }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  chat : state.chat
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
