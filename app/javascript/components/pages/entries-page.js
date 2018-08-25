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
    const {
      entries,
      currentUser,
      user,
      numEntryPages,
      currentEntriesPageNum,
      entriesPageStartNum
    } = this.props;
    const baseURL = `/users/${user.id}/entries`;

    return (
      <ErrorBoundary>
        <div className="entries-page">
          <div className="entries-page__profile-aside">
            <ProfileAside user={user} />
          </div>
          <div className="entries-page__entries">
            <h1 className="mb-5">Entries</h1>
            <Entries entries={entries} currentUser={currentUser} user={user} />
            <Pagination
              numPages={numEntryPages}
              baseURL={baseURL}
              pageStartNum={entriesPageStartNum}
              currentPageNum={currentEntriesPageNum}
            />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

EntriesPage.defaultProps = {
  entries: [],
  user: {},
  currentUser: {},
  numEntryPages: 1,
  currentEntriesPageNum: 1
};
