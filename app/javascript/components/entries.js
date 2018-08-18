import React from 'react';
import Entry from './entry';
import CONSTANTS from '../constants';
import ModalConfirmDeleteEntry from './modals/modal-confirm-delete-entry';
import EntryActions from '../actions/entry';
import ErrorBoundary from './error-boundary';
import MessageForm from './message-form';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.state = {
      modalConfirmDeleteVisible: false,
      messages: []
    };
  }

  componentDidMount() {
    fetch(CONSTANTS.appDomainURL + '/messages?type=recipient')
      .then(res => {
        return res.json();
      })
      .then(messages => {
        this.setState({ messages });
      });
  }

  delete(id) {
    EntryActions.deleteEntry(id);
  }

  cancelDelete() {
    this.setState({ modalConfirmDeleteVisible: false });
  }

  onClickDelete(id) {
    this.setState({ modalConfirmDeleteVisible: true, itemToDeleteID: id });
  }

  onClickEdit(id) {
    window.location.href = CONSTANTS.appDomainURL + '/entries/' + `${id}` + '/edit';
  }

  render() {
    let { entries } = this.props;
    const { modalConfirmDeleteVisible, itemToDeleteID, messages, message } = this.state;
    let entriesDOM = <h3 className="text-center">No entries, add some!</h3>;
    let messagesDOM = messages.map(message => {
      return <Message message={message} key={message.id} />;
    });

    if (messages.length === 0) {
      messagesDOM = <h3 className="text-center">Waiting for some messages...</h3>;
    }

    if (entries.length > 0) {
      entriesDOM = entries.map((entry, idx) => {
        return (
          <div key={entry.id}>
            <Entry
              entry={entry}
              type="index-page"
              onClickDelete={() => {
                this.onClickDelete(entry.id);
              }}
              onClickEdit={() => {
                this.onClickEdit(entry.id);
              }}
            />
            {idx !== entries.length - 1 && <hr />}
          </div>
        );
      });
    }

    return (
      <ErrorBoundary>
        <div className="row entries justify-content-center">
          <ModalConfirmDeleteEntry
            onCancel={this.cancelDelete}
            onDelete={this.delete}
            itemToDeleteID={itemToDeleteID}
            visible={modalConfirmDeleteVisible}
          />
          <div className="col-6">
            <h2 className="text-center">Entries</h2>
            <div className="entries-section">{entriesDOM}</div>
            <hr />
            <div className="messages-section">
              <div className="messages-section__form">
                <MessageForm message={message} />
              </div>
              <hr />
              <h2 className="text-center">Messages</h2>
              <div className="messages-section__messages">{messagesDOM}</div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
