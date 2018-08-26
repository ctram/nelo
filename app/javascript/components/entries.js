import React from 'react';
import Entry from './entry';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entries, currentUser } = this.props;
    let entriesDOM;

    if (entries.length > 0) {
      entriesDOM = entries.map(entry => {
        const isAuthor = currentUser.id === entry.author.id;

        return (
          <Entry
            entry={entry}
            key={entry.id}
            canEdit={isAuthor}
            canDelete={isAuthor}
            titleAsLink={true}
            currentUser={currentUser}
          />
        );
      });
    } else {
      entriesDOM = <h4 className="text-center my-3">No entries.</h4>;
    }

    return <div className="entries">{entriesDOM}</div>;
  }
}

Entries.defaultProps = {
  entries: [],
  currentUser: {}
};
