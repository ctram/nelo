import React from 'react';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entryContent, entryTitle } = this.props;

    return (
      <div>
        <h3>{entryTitle}</h3>
        <div>{entryContent}</div>
      </div>
    );
  }
}
