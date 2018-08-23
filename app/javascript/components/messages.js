import React from 'react';
import Message from './message';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;
    let messagesDOM;

    if (messages.length > 0) {
      messagesDOM = messages.map(message => {
        return <Message message={message} key={message.id} />;
      });
    } else {
      messagesDOM = <h4 className="text-center">No messages.</h4>;
    }

    return <div className="messages">{messagesDOM}</div>;
  }
}

Messages.defaultProps = {
  messages: []
};
