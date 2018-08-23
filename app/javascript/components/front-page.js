import React from 'react';
import Messages from './messages';
import Entries from './entries';
import EntryActions from '../actions/entry-actions';
import MessageActions from '../actions/message-actions';

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: props.messages,
      entries: props.entries
    };
  }

  componentDidMount() {
    EntryActions.fetchFrontPageEntries()
      .then(entries => {
        this.setState({ entries });
        return MessageActions.fetchFrontPageMessages();
      })
      .then(messages => {
        this.setState({ messages });
      })
      .catch(console.error);
  }

  render() {
    const { entries, messages } = this.state;
    let entriesDOM;

    if (entries.length > 0) {
      entriesDOM = entries.map(entry => {
        <Entry entry={entry} key={entry.id} />;
      });
    } else {
      entriesDOM = <h4 className="text-center my-3">No entries yet.</h4>;
    }

    let messagesDOM;

    if (messages.length > 0) {
      messagesDOM = messages.map(message => {
        <Message message={message} key={message.id} />;
      });
    } else {
      messagesDOM = <h4 className="text-center my-3">No messages yet.</h4>;
    }

    return (
      <div className="front-page p-3">
        <h1>Front Page</h1>
        <div className="latest-entries">
          <h2 className="mb-3 text-center">Latest Entries</h2>
          {entriesDOM}
        </div>
        <div className="latest-messages text-center">
          <h2 className="mb-3">Latest Messages</h2>
          <Messages messages={messages} />
        </div>
      </div>
    );
  }
}

FrontPage.defaultProps = {
  entries: [],
  messages: []
};
