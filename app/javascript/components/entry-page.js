import React from 'react';
import EntryForm from './entry-form';
import Entry from './entry';
import EntryActions from '../actions/entry-actions';
import ModalConfirmDeleteEntry from './modals/modal-confirm-delete-entry';
import CONSTANTS from '../constants';
import ErrorBoundary from './error-boundary';

export default class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: !props.entry.id || props.editMode,
      entry: props.entry,
      modalConfirmDeleteVisible: false
    };
    this.originalEntry = Object.assign({}, props.entry);
    this.onCancelEditMode = this.onCancelEditMode.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.delete = this.delete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    let { entry } = this.state;
    const type = e.target.getAttribute('data-type');
    entry = Object.assign({}, entry);
    entry[type] = value;
    this.setState({ entry });
  }

  cancelDelete() {
    this.setState({ modalConfirmDeleteVisible: false });
  }

  onClickDelete() {
    this.setState({ modalConfirmDeleteVisible: true });
  }

  delete(id) {
    EntryActions.deleteEntry(id);
  }

  onClickEdit() {
    window.location.href = CONSTANTS.appDomainURL + '/entries/' + this.props.entry.id + '/edit';
  }

  goToEdit() {
    window.location.href = CONSTANTS.appDomainURL + '/entries/' + this.props.entry.id + '/edit';
  }

  onCancelEditMode() {
    const { entry } = this.state;
    let okToGo = true;

    if (entry.title !== this.originalEntry.title || entry.content !== this.originalEntry.content) {
      okToGo = window.confirm('Data has not been saved. Are you sure you want to leave?');
    }

    if (okToGo) {
      window.location.href = CONSTANTS.appDomainURL + '/entries/' + this.props.entry.id;
    }
  }

  render() {
    const { editMode, entry, modalConfirmDeleteVisible } = this.state;
    const { currentUser } = this.props;
    let entryDOM;
    const isAuthor = currentUser.id === entry.author_id || currentUser.role === 'admin';

    if (editMode) {
      entryDOM = (
        <EntryForm
          entry={entry}
          onChange={this.onChange}
          onCancelEditMode={this.onCancelEditMode}
          onClickDelete={this.onClickDelete}
          currentUser={currentUser}
        />
      );
    } else {
      entryDOM = (
        <Entry
          entry={entry}
          onClickEdit={this.onClickEdit}
          onClickDelete={this.onClickDelete}
          canEdit={isAuthor}
          canDelete={isAuthor}
        />
      );
    }

    return (
      <ErrorBoundary>
        <ModalConfirmDeleteEntry
          onCancel={this.cancelDelete}
          onDelete={this.delete}
          itemToDeleteID={entry.id}
          visible={modalConfirmDeleteVisible}
        />
        {entryDOM}
      </ErrorBoundary>
    );
  }
}

EntryPage.defaultProps = {
  editMode: false
};
