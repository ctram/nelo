import React from 'react';
import Messages from './messages';
import Entries from './entries';
import EntryActions from '../actions/entry-actions';
import MessageActions from '../actions/message-actions';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      entries: []
    };
  }

  componentDidMount() {
    EntryActions.fetchHomePageEntries()
      .then(entries => {
        this.setState({ entries });
        return MessageActions.fetchHomePageMessages();
      })
      .then(messages => {
        this.setState({ messages });
      })
      .catch(console.error);
  }

  render() {
    const { entries, messages } = this.state;

    return (
      <div className="home-page">
        <div className="latest-entries">
          <h2>Latest Entries</h2>
          <Entries entries={entries} />
        </div>
        <div className="latest-messages">
          <h2>Latest Messages</h2>
          <Messages messages={messages} />
        </div>
      </div>
    );
  }
}
