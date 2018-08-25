import React from 'react';
import EntryForm from '../entry-form';
import Entry from '../entry';
import CommentForm from '../comment-form';
import Comments from '../comments';
import EntryActions from '../../actions/entry-actions';
import ModalConfirmDeleteEntry from '../modals/modal-confirm-delete-entry';
import CONSTANTS from '../../constants';
import ErrorBoundary from '../error-boundary';
import ProfileAside from '../profile-aside';

function EntryPageMain(props) {
  let { modalConfirmDeleteVisible, onClickCancel, onClickDelete, entryDOM, className } = props;

  className = className ? className : '';

  return (
    <div className={'entry-page__content ' + className}>
      <ModalConfirmDeleteEntry
        onClickCancel={onClickCancel}
        onClickDelete={onClickDelete}
        visible={modalConfirmDeleteVisible}
      />
      {entryDOM}
    </div>
  );
}

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
    let { value } = e.target;
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
    this.setState({
      modalConfirmDeleteVisible: true
    });
  }

  delete() {
    EntryActions.deleteEntry(this.state.entry.id)
      .then(res => {
        if (res.ok) {
          toastr.success('Entry deleted.');
          window.location.href =
            CONSTANTS.appDomainURL + '/users/' + this.props.currentUser.id + '/entries';
        }
      })
      .catch(console.error);
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
    const { currentUser, comments } = this.props;
    let entryDOM;
    let dom;
    let isAuthor = null;
    let commentsDOM;
    let profileAsideDOM;

    if (entry.id) {
      isAuthor = currentUser.id === entry.author.id || currentUser.role === 'admin';
    }

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

    let entryPageMainDOM = (
      <div className="entry-page__main">
        <EntryPageMain
          className={''}
          modalConfirmDeleteVisible={modalConfirmDeleteVisible}
          onClickCancel={this.onClickCancel}
          onClickDelete={this.onClickDelete}
          entryDOM={entryDOM}
          entry={entry}
          currentUser={currentUser}
          comments={comments}
        />
      </div>
    );

    if (editMode) {
      dom = (
        <div className="row justify-content-center">
          <div className="col-6">{entryPageMainDOM}</div>
        </div>
      );
    } else {
      commentsDOM = (
        <div className="entry-page__comments">
          <hr />
          <CommentForm recipientID={entry.author.id} currentUser={currentUser} />
          <h4 className="text-center mt-5">Comments</h4>
          <Comments comments={comments} />
        </div>
      );
      profileAsideDOM = (
        <div className="position-fixed entry-page__profile-aside">
          <ProfileAside user={entry.author} />
        </div>
      );
      dom = (
        <div className="row">
          <div className="col-3">{profileAsideDOM}</div>
          <div className="col-9">
            {entryPageMainDOM}
            {commentsDOM}
          </div>
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <div className="entry-page px-5">{dom}</div>
      </ErrorBoundary>
    );
  }
}

EntryPage.defaultProps = {
  editMode: false,
  comments: []
};
