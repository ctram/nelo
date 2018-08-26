import React from 'react';
import EntryForm from '../entry-form';
import Entry from '../entry';
import CommentForm from '../comment-form';
import Comments from '../comments';
import CONSTANTS from '../../constants';
import ErrorBoundary from '../error-boundary';
import ProfileAside from '../profile-aside';

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
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let { value } = e.target;
    let { entry } = this.state;
    const type = e.target.getAttribute('data-type');
    entry = Object.assign({}, entry);
    entry[type] = value;
    this.setState({ entry });
  }

  onClickEdit() {
    window.location.href = CONSTANTS.APP_DOMAIN_URL + '/entries/' + this.props.entry.id + '/edit';
  }

  goToEdit() {
    window.location.href = CONSTANTS.APP_DOMAIN_URL + '/entries/' + this.props.entry.id + '/edit';
  }

  onCancelEditMode() {
    const { entry } = this.state;
    let okToGo = true;

    if (entry.title !== this.originalEntry.title || entry.content !== this.originalEntry.content) {
      okToGo = window.confirm('Data has not been saved. Are you sure you want to leave?');
    }

    if (okToGo) {
      window.location.href = CONSTANTS.APP_DOMAIN_URL + '/entries/' + this.props.entry.id;
    }
  }

  render() {
    const { editMode, entry } = this.state;
    const { currentUser, comments, className } = this.props;
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
          currentUser={currentUser}
        />
      );
    } else {
      entryDOM = (
        <Entry
          entry={entry}
          onClickEdit={this.onClickEdit}
          canEdit={isAuthor}
          canDelete={isAuthor}
        />
      );
    }

    let entryPageMainDOM = (
      <div className="entry-page__main">
        <div className={'entry-page__content ' + className}>{entryDOM}</div>
      </div>
    );

    if (editMode) {
      dom = (
        <div className="row justify-content-center">
          <div className="col-6">{entryPageMainDOM}</div>
        </div>
      );
    } else {
      const newComment = {
        author: currentUser,
        recipient: { id: entry.author.id },
        entry
      };

      commentsDOM = (
        <div className="entry-page__comments">
          <hr />
          <CommentForm comment={newComment} />
          <h4 className="text-center mt-5">Comments</h4>
          <Comments
            comments={comments}
            handleDelete={this.deleteComment}
            currentUser={currentUser}
            bylineType="says"
          />
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
