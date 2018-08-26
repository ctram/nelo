import React from 'react';
import Form from './form';
import CONSTANTS from '../constants';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !props.comment.id,
      commentContent: props.comment.content,
      cancelBtnDisabled: true
    };
    this.originalContent = props.comment.content;
    this.onChange = this.onChange.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    this.setState({ commentContent: value, cancelBtnDisabled: value === this.originalContent });
  }

  onClickCancel() {
    let result = false;
    if (this.state.commentContent !== this.originalContent) {
      result = window.confirm('You have not saved you changes. Are you sure you want to leave?');
    }

    if (result) {
      window.location.href = CONSTANTS.APP_DOMAIN_URL + '/comments/' + this.props.comment.id;
    }
  }

  render() {
    const { isNew, commentContent, cancelBtnDisabled } = this.state;
    const { comment } = this.props;
    const action = isNew ? `/users/${comment.author.id}/comments` : `/comments/${comment.id}`;
    const method = isNew ? 'POST' : 'PATCH';
    const btnText = isNew ? 'Send' : 'Update';

    return (
      <div className="comment-form">
        <Form action={action} method={method} onSubmit={() => {}}>
          <input type="hidden" name="comment[recipient_id]" value={comment.recipient.id} />
          <input type="hidden" name="comment[author_id]" value={comment.author.id} />
          <input type="hidden" name="comment[entry_id]" value={comment.entry.id} />
          <div className="form-group">
            <textarea
              name="comment[content]"
              value={commentContent}
              onChange={this.onChange}
              placeholder="Leave a comment"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="privacy-level-select">Privacy Level</label>
            <select
              className="form-control"
              id="privacy-level-select"
              name="comment[privacy_level]"
            >
              <option value="private">Private</option>
              <option value="friends">Friends</option>
              <option value="public">Public</option>
            </select>
          </div>
          <button className="btn btn-primary">{btnText}</button>
          {!isNew && (
            <button
              type="button"
              className="btn btn-secondary ml-3"
              onClick={this.onClickCancel}
              disabled={cancelBtnDisabled}
            >
              Cancel
            </button>
          )}
        </Form>
      </div>
    );
  }
}

CommentForm.defaultProps = {
  comment: {}
};
