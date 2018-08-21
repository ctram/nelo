import React from 'react';
import MarkupHelpers from './helpers/markup-helpers';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message } = this.props;

    return (
      <div className="message p-3">
        <div className="message__author">
          <strong>{message.author.email}</strong> says:
        </div>
        <div
          className="message__content my-3 ml-3 p-3"
          dangerouslySetInnerHTML={MarkupHelpers.createMarkup(message.content)}
        />
      </div>
    );
  }
}

Message.defaultProps = {
  message: {}
};
