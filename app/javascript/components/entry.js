import React from 'react';
import Modal from './modal';
import CONSTANTS from '../constants';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.onDelete(this.props.entry.id);
  }

  render() {
    const {
      entry: { title: entryTitle, content: entryContent }
    } = this.props;

    return (
      <div className="entry d-flex justify-content-between">
        <div className="entry__details">
          <h3>{entryTitle}</h3>
          <div>{entryContent}</div>
        </div>
        <div className="entry__actions">
          <button
            role="button"
            className="btn btn-outline-primary btn-small mr-3"
            onClick={this.edit}
          >
            Edit
          </button>
          <button
            role="button"
            className="btn btn-outline-danger btn-small"
            onClick={this.delete}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
