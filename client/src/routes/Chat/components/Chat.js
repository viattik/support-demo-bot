import React, { PropTypes as toBe } from 'react';

import './Chat.scss'


export default class Chat extends React.Component {

  static propTypes = {
    chat: toBe.object,
    addMessage: toBe.func
  };

  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      text: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { chat: { from } } = this.props;
    const { text } = this.state;
    this.props.addMessage(from.id, text);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  renderMessage(message) {
    const { chat: { from, messages } } = this.props;
    const senderName = message.sender === 0
      ? `${from.first_name} ${from.last_name}`
      : 'You';
    return (
      <div className="row" key={messages.indexOf(message)}>
        <label className="pull-left">{ senderName }:</label>
        <div className="pull-left">{ message.text }</div>
      </div>
    );
  }

  renderForm() {
    const { text } = this.state;
    return (
      <form className="form-inline row" onSubmit={this.onSubmit}>
        <input value={text} type="text" className="form-control" onChange={this.onChange}/>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }

  render() {
    const { chat } = this.props;
    return chat
      ? (
        <div className="chat-messages">
          { chat.messages.map(this.renderMessage) }
          { this.renderForm() }
        </div>
      )
      : null;
  }
}
