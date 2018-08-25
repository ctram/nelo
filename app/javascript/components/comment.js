import React from 'react';
import MarkupHelpers from './helpers/markup-helpers';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comment } = this.props;

    return (
      <div className="comment p-3">
        <div className="message__author">
          <strong>{comment.author.email}</strong> says:
        </div>
        <div
          className="comment__content my-3 ml-3 p-3"
          dangerouslySetInnerHTML={MarkupHelpers.createMarkup(comment.content)}
        />
      </div>
    );
  }
}

Comment.defaultProps = {
  comment: {}
};
