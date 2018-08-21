import React from 'react';
import Form from './form';

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !props.message.id,
      messageContent: props.message.content
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    this.setState({ messageContent: value });
  }

  render() {
    const { isNew, messageContent } = this.state;
    const { message, userID, currentUser } = this.props;
    const action = isNew ? `/users/${currentUser.id}/messages` : `/messages/${message.id}`;
    const method = isNew ? 'POST' : 'PATCH';

    return (
      <div className="message-form">
        <Form action={action} method={method} onSubmit={() => {}}>
          <input type="hidden" name="message[recipient_id]" value={userID} />
          <input type="hidden" name="message[author_id]" value={currentUser.id} />
          <div className="form-group">
            <textarea
              name="message[content]"
              value={messageContent}
              onChange={this.onChange}
              placeholder="Leave a message"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="privacy-level-select">Privacy Level</label>
            <select
              className="form-control"
              id="privacy-level-select"
              name="message[privacy_level]"
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

MessageForm.defaultProps = {
  message: {}
};
