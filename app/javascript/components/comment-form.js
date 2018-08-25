import React from 'react';
import Form from './form';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !props.comment.id,
      commentContent: props.comment.content
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    this.setState({ commentContent: value });
  }

  render() {
    const { isNew, commentContent } = this.state;
    const { comment, recipientID, currentUser } = this.props;
    const action = isNew ? `/users/${currentUser.id}/comments` : `/comments/${comment.id}`;
    const method = isNew ? 'POST' : 'PATCH';

    return (
      <div className="comment-form">
        <Form action={action} method={method} onSubmit={() => {}}>
          <input type="hidden" name="comment[recipient_id]" value={recipientID} />
          <input type="hidden" name="comment[author_id]" value={currentUser.id} />
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
              {/*
              <option value="friends">Friends</option>
            */}
              <option value="public">Public</option>
            </select>
          </div>
          <button className="btn btn-primary">Send</button>
        </Form>
      </div>
    );
  }
}

CommentForm.defaultProps = {
  comment: {}
};
