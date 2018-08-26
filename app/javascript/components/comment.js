import React from 'react';
import MarkupHelper from '../helpers/markup-helper';
import CONSTANTS from '../constants';
import CommentActions from '../actions/comment-actions';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    let result = window.confirm('Are you sure you want to delete this comment?');
    const { comment, currentUser } = this.props;

    if (result) {
      CommentActions.deleteComment(comment.id)
        .then(res => {
          if (res.ok) {
            toastr.success('Comment deleted.');
            return setTimeout(() => {
              window.location.href =
                CONSTANTS.APP_DOMAIN_URL + '/users/' + currentUser.id + '/comments';
            }, CONSTANTS.DELAY_BEFORE_REDIRECT);
          }
          toastr.info(res.status);
        })
        .catch(e => {
          console.error(e);
          toastr.error(e);
        });
    }
  }

  render() {
    const { comment, currentUser, bylineType } = this.props;
    let isAuthor = false;
    let isRecipient = false;

    if (currentUser) {
      isAuthor = currentUser.id === comment.author.id;
      isRecipient = currentUser.id === comment.recipient.id;
    }

    let bylineDOM;

    switch (bylineType) {
      case 'none':
        bylineDOM = null;
        break;
      case 'says':
        bylineDOM = (
          <div className="d-inline">
            <strong>{comment.author.username}</strong> says:
          </div>
        );
        break;
      default:
        bylineDOM = (
          <div className="d-inline">
            <strong>{comment.author.username}</strong> commented on{' '}
            <a href={'/entries/' + comment.entry.id}>{comment.entry.title}</a>
          </div>
        );
    }

    return (
      <div className="comment p-3 py-5">
        {comment.id && (
          <div className="comment__actions mb-3">
            {isAuthor && (
              <a
                href={'/comments/' + comment.id + '/edit'}
                className="btn btn-outline-primary btn-sm mr-3"
              >
                Edit
              </a>
            )}
            {(isAuthor || isRecipient) && (
              <button className="btn btn-outline-danger btn-sm" onClick={this.onClickDelete}>
                Delete
              </button>
            )}
          </div>
        )}

        <div className="message__byline">
          {comment.privacy_level === 'private' && (
            <span className="badge badge-secondary mr-3">Private</span>
          )}
          {bylineDOM}
        </div>
        <div
          className="comment__content my-3 ml-3 p-3 card"
          dangerouslySetInnerHTML={MarkupHelper.createHTML(comment.content)}
        />
      </div>
    );
  }
}

Comment.defaultProps = {
  comment: {},

  bylineType: 'with entry link'
};
