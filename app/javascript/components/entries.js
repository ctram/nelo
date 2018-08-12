import React from 'react';
import Entry from './entry';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entries } = this.props;

    return (
      <div>
        {entries.map(entry => {
          return <Entry entry={entry} key={entry.id} />;
        })}
      </div>
    );
  }
}
