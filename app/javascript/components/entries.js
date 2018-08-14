import React from 'react';
import Entry from './entry';
import CONSTANTS from '../constants';
import ModalConfirmDeleteEntry from './modals/modal-confirm-delete-entry';
import entryActions from '../actions/entry';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.modalConfirmDeleteEntry = this.modalConfirmDeleteEntry.bind(this);

    this.state = {
      modalConfirmDeleteVisible: false
    };
  }

  delete(id) {
    entryActions.deleteEntry(id);
  }

  edit(id) {
    window.location.href = CONSTANTS + '/entries/' + `${id}`;
  }

  cancelDelete() {
    this.setState({ modalConfirmDeleteVisible: false });
  }

  modalConfirmDeleteEntry(id) {
    this.setState({ modalConfirmDeleteVisible: true, itemToDeleteID: id });
  }

  render() {
    let { entries } = this.props;
    const { modalConfirmDeleteVisible, itemToDeleteID } = this.state;
    let entriesDOM = <div className="text-center">No entries</div>;

    if (entries.length > 0) {
      entriesDOM = entries.map((entry, idx) => {
        return (
          <div key={entry.id}>
            <Entry entry={entry} onDelete={this.modalConfirmDeleteEntry} />
            {idx !== entries.length - 1 && <hr />}
          </div>
        );
      });
    }

    return (
      <div className="row justify-content-center">
        <ModalConfirmDeleteEntry
          onCancel={this.cancelDelete}
          onDelete={this.delete}
          itemToDeleteID={itemToDeleteID}
          visible={modalConfirmDeleteVisible}
        />
        <div className="col-6">
          <h2 className="text-center">Entries</h2>
          {entriesDOM}
        </div>
      </div>
    );
  }
}
