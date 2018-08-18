import React from 'react';
export default class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    const { entry } = props;
    const { id } = entry;
    const isNew = !id;

    this.state = {
      isNew,
      heading: isNew ? 'Edit Entry' : 'Create Entry'
    };
  }

  componentDidMount() {
    document.getElementById('entry-form').onkeypress = function(e) {
      if (e.target.nodeName === 'TEXTAREA') {
        return;
      }
      var key = e.charCode || e.keyCode || 0;
      if (key == 13) {
        e.preventDefault();
      }
    };
  }

  render() {
    const { heading, isNew } = this.state;
    const {
      entry: { title, content }
    } = this.props;
    const authenticityToken = document.getElementsByTagName('meta')[1].getAttribute('content');

    let url = '/entries';

    if (!isNew) {
      url += `/${this.props.entry.id}`;
    }

    return (
      <div className="row justify-content-center entry-form">
        <div className="col-6">
          <h2>{heading}</h2>
          <form
            id="entry-form"
            action={url}
            method="POST"
            acceptCharset="UTF-8"
            onSubmit={this.props.onSubmit}
          >
            {!isNew && <input name="_method" type="hidden" value="patch" />}
            <input name="utf8" type="hidden" value="✓" />
            <input type="hidden" name="authenticity_token" value={authenticityToken} />
            <div className="form-group">
              <label htmlFor="title-input">Title</label>
              <input
                id="title-input"
                className="form-control"
                name="entry[title]"
                value={title}
                data-type="title"
                onChange={this.props.onChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                data-type="content"
                onChange={this.props.onChange}
                name="entry[content]"
                value={content}
                required
              />
            </div>
            <div className="btns">
              <button type="submit" className="btn btn-primary mr-3">
                Save
              </button>
              {!isNew && (
                <button
                  type="button"
                  className="btn btn-secondary mr-3"
                  onClick={this.props.onCancelEditMode}
                >
                  Cancel
                </button>
              )}
              {!isNew && (
                <button
                  type="button"
                  className="btn btn-danger mr-3"
                  onClick={this.props.onClickDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
