import React from 'react';
import Entry from './entry';
import CONSTANTS from '../constants';
import ModalConfirmDeleteEntry from './modals/modal-confirm-delete-entry';
import EntryActions from '../actions/entry';
import ErrorBoundary from './error-boundary';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.state = {
      modalConfirmDeleteVisible: false
    };
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
    const { modalConfirmDeleteVisible, itemToDeleteID } = this.state;
    let entriesDOM = <div className="text-center">No entries</div>;

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
      </ErrorBoundary>
    );
  }
}
