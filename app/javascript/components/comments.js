import React from 'react';
import Comment from './comment';

export default class Comments extends React.Component {
  render() {
    const { comments, currentUser, bylineType } = this.props;
    let commentsDOM;

    if (comments.length > 0) {
      commentsDOM = comments.map(comment => {
        return (
          <Comment
            comment={comment}
            key={comment.id}
            currentUser={currentUser}
            onClickDelete={() => {
              this.onClickDelete(comment.id);
            }}
            bylineType={bylineType}
          />
        );
      });
    } else {
      commentsDOM = <h5 className="text-center">No comments.</h5>;
    }

    return <div className="comments">{commentsDOM}</div>;
  }
}

Comments.defaultProps = {
  comments: [],

  bylineType: null
};
