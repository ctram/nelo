import React from 'react';
import Entries from '../entries';
import ErrorBoundary from '../error-boundary';

export default class EntriesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entries, currentUser, user } = this.props;

    return (
      <ErrorBoundary>
        <div className="entries-page p-3">
          <h1>Entries</h1>
          <Entries entries={entries} currentUser={currentUser} user={user} />
        </div>
      </ErrorBoundary>
    );
  }
}

EntriesPage.defaultProps = {
  entries: [],
  user: {},
  currentUser: {}
};
