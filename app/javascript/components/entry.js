import React from 'react';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      entry: { title: entryTitle, content: entryContent }
    } = this.props;

    return (
      <div className="entry">
        <h3>{entryTitle}</h3>
        <div>{entryContent}</div>
      </div>
    );
  }
}
