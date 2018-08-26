import React from 'react';
import Comment from '../comment';
import CommentForm from '../comment-form';

export default class CommentPage extends React.Component {
  render() {
    const { editMode, comment, currentUser } = this.props;
    let dom;

    if (editMode) {
      dom = (
        <div>
          <h4 className="text-center">Edit Comment</h4>
          <CommentForm comment={comment} />
        </div>
      );
    } else {
      dom = (
        <div>
          <Comment comment={comment} currentUser={currentUser} onClickDelete={this.onClickDelete} bylineType="with entry link"/>
        </div>
      );
    }

    return <div className="comment-page px-5">{dom}</div>;
  }
}

CommentPage.defaultProps = {
  comment: {},
  currentUser: {}
};
