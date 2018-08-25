import React from 'react';
import Comment from './comment';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;
    let commentsDOM;

    if (comments.length > 0) {
      commentsDOM = comments.map(comment => {
        return <Comment comment={comment} key={comment.id} />;
      });
    } else {
      commentsDOM = <h4 className="text-center">No comments.</h4>;
    }

    return <div className="comments">{commentsDOM}</div>;
  }
}

Comments.defaultProps = {
  comments: []
};
