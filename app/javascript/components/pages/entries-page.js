import React from 'react';
import Entries from '../entries';
import ErrorBoundary from '../error-boundary';
import ProfileAside from '../profile-aside';
import Pagination from '../pagination';

export default class EntriesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entries, currentUser, user, paginationDetails } = this.props;
    const baseURL = `/users/${user.id}/entries?entry_page=`;

    return (
      <ErrorBoundary>
        <div className="entries-page">
          <div className="entries-page__profile-aside">
            <ProfileAside user={user} currentUser={currentUser} />
          </div>
          <div className="entries-page__entries">
            <h1 className="mb-3">Entries</h1>
            <Entries entries={entries} currentUser={currentUser} user={user} />
            <Pagination {...paginationDetails.entries_pagination} baseURL={baseURL} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

EntriesPage.defaultProps = {
  entries: [],
  user: {},

  numEntryPages: 1,
  currentEntriesPageNum: 1
};
