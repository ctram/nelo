import React from 'react';
import CONSTANTS from '../constants';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.generateContentDOM = this.generateContentDOM.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  delete() {
    this.props.onDelete(this.props.entry.id);
  }

  generateContentDOM(content) {
    return content.replace(/\r\n/g, '<br/>').replace(/ /g, '&nbsp;');
  }

  createMarkup(content) {
    return { __html: this.generateContentDOM(content) };
  }

  render() {
    const { entry } = this.props;
    const { title: entryTitle, content: entryContent } = entry;

    return (
      <div className="entry d-flex justify-content-between">
        <div className="entry__details">
          <h3>{entryTitle}</h3>
          <div
            className="entry__content"
            dangerouslySetInnerHTML={this.createMarkup(entryContent)}
          />
        </div>
        <div className="entry__actions">
          <a
            className="btn btn-outline-primary btn-small mr-3"
            href={CONSTANTS.appDomainURL + '/entries/' + `${entry.id}`}
          >
            Edit
          </a>
          <button role="button" className="btn btn-outline-danger btn-small" onClick={this.delete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
