import React from 'react';
import Entry from './entry';
export default class Entries extends React.Component {
  render() {
    const { entries } = this.props;
    let entriesDOM;

    if (entries.length > 0) {
      entriesDOM = entries.map(entry => {
        return <Entry entry={entry} key={entry.id} />;
      });
    } else {
      entriesDOM = <h4 className="text-center my-3">No entries.</h4>;
    }

    return <div className="entries">{entriesDOM}</div>;
  }
}

Entries.defaultProps = {
  entries: []
};
