import React from 'react';

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !props.message.id,
      messageContent: props.message.content
    };
  }

  onChange(e) {
    const value = e.target.value;
    this.setState({ messageContent: value });
  }

  render() {
    const { isNew, messageContent } = this.state;
    const { message } = this.props;
    const action = isNew ? '/messages' : `/message/${message.id}`;

    return (
      <div className="message-form">
        <form action={action}>
          <div className="form-group">
            <textarea value={messageContent} onChange={this.onChange} placeholder="Leave a message"/>
          </div>
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    );
  }
}

MessageForm.defaultProps = {
  message: {}
};
