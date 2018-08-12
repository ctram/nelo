import React from 'react';

export default class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    const { entryContent, entryTitle } = props;
    this.state = {
      entryTitle,
      entryContent
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {}

  handleSubmit() {}

  render() {
    const { entryContent, entryTitle } = this.state;

    return (
      <div>
        <input value={entryTitle} onChange={this.handleChange} />
        <textarea value={entryContent} onChange={this.handleChange} />
        <button role="button" onClick={this.handleSubmit}>
          Save
        </button>
      </div>
    );
  }
}
