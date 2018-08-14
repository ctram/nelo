import React from 'react';

export default class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    const { entry } = props;
    const { id, title, content } = entry;
    const isNew = !id;

    this.state = {
      isNew,
      heading: isNew ? 'Edit Entry' : 'Create Entry',
      title,
      content,
      editMode: isNew
    };

    this.onChange = this.onChange.bind(this);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.cancelEditMode = this.cancelEditMode.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    const type = e.target.getAttribute('data-type');
    let newState = Object.assign({}, this.state);
    newState[type] = value;
    this.setState(newState);
  }

  enterEditMode() {
    this.originalData = {
      title: this.state.title,
      content: this.state.content
    };
    this.setState({ editMode: true });
  }

  cancelEditMode() {
    this.setState({
      editMode: false,
      title: this.originalData.title,
      content: this.originalData.content
    });
  }

  render() {
    const { heading, title, content, isNew, editMode } = this.state;
    const authenticityToken = document.getElementsByTagName('meta')[1].getAttribute('content');

    let url = '/entries';

    if (!isNew) {
      url += `/${this.props.entry.id}`;
    }

    return (
      <div className="row justify-content-center entry-form">
        <div className="col-6">
          <h2>{heading}</h2>
          <form action={url} method="POST" acceptCharset="UTF-8">
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
                onChange={this.onChange}
                disabled={!editMode}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                data-type="content"
                onChange={this.onChange}
                name="entry[content]"
                value={content}
                disabled={!editMode}
                required
              />
            </div>
            <div className="btns">
              {editMode && (
                <button type="button" className="btn btn-primary mr-3">
                  Save
                </button>
              )}
              {!isNew &&
                !editMode && (
                  <button
                    type="button"
                    className="btn btn-success mr-3"
                    onClick={this.enterEditMode}
                  >
                    Edit
                  </button>
                )}
              {!isNew &&
                editMode && (
                  <button type="button" className="btn btn-info" onClick={this.cancelEditMode}>
                    Cancel
                  </button>
                )}
              {!isNew &&
                !editMode && (
                  <button type="button" className="btn btn-primary mr-3">
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
