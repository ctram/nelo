import React from 'react';
import Entry from './entry';
import ModalConfirmDeleteEntry from './modals/modal-confirm-delete-entry';
import EntryActions from '../actions/entry-actions';
import CONSTANTS from '../constants';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.ajax = this.ajax.bind(this);

    this.state = {
      modalConfirmDeleteEntryVisible: false
    };
  }

  onClickDelete(id) {
    this.setState({
      modalConfirmDeleteEntryVisible: true,
      handleDelete: () => {
        this.handleDelete(id);
      }
    });
  }

  handleDelete(id) {
    EntryActions.deleteEntry(id)
      .then(res => {
        if (res.ok) {
          toastr.success('Entry deleted.');
          return setTimeout(() => {
            window.location.href =
              CONSTANTS.appDomainURL + '/users/' + this.props.currentUser.id + '/entries';
          }, 1000);
        }

        toastr.danger(res.status);
      })
      .catch(console.error);
  }

  onClickCancel() {
    this.setState({ modalConfirmDeleteEntryVisible: false });
  }

  ajax() {
    fetch('http://localhost:3000/hey');
  }

  render() {
    const { entries, currentUser } = this.props;
    const { modalConfirmDeleteEntryVisible, handleDelete } = this.state;
    let entriesDOM;

    if (entries.length > 0) {
      entriesDOM = entries.map(entry => {
        const isAuthor = currentUser.id === entry.author_id;

        return (
          <Entry
            entry={entry}
            key={entry.id}
            onClickDelete={this.onClickDelete}
            canEdit={isAuthor}
            canDelete={isAuthor}
          />
        );
      });
    } else {
      entriesDOM = <h4 className="text-center my-3">No entries.</h4>;
    }

    return (
      <div className="entries">
        <ModalConfirmDeleteEntry
          visible={modalConfirmDeleteEntryVisible}
          onClickDelete={handleDelete}
          onClickCancel={this.onClickCancel}
        />
        {entriesDOM}
      </div>
    );
  }
}

Entries.defaultProps = {
  entries: [],
  user: {},
  currentUser: {}
};
