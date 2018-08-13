import React from 'react';

export default class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    const { entryContent, entryTitle, id } = props;
    this.state = {
      entryTitle,
      entryContent,
      heading: id ? 'Edit Entry' : 'Create Entry'
    };
  }

  render() {
    const { heading } = this.state;
    const authenticityToken = document.getElementsByTagName('meta')[1].getAttribute('content');

    return (
      <div className="row justify-content-center entry-form">
        <div className="col-6">
          <h2>{heading}</h2>
          <form action="/entries" method="POST" acceptCharset="UTF-8">
            <input name="utf8" type="hidden" value="✓" />
            <input type="hidden" name="authenticity_token" value={authenticityToken} />
            <div className="form-group">
              <label htmlFor="title-input">Title</label>
              <input id="title-input" className="form-control" name="entry[title]" required />
            </div>
            <div className="form-group">
              <textarea className="form-control" name="entry[content]" required />
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    );
  }
}
