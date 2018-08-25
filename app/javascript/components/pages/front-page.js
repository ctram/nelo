import React from 'react';
import Comments from '../comments';
import Entries from '../entries';
import ErrorBoundary from '../error-boundary';
import Pagination from '../pagination';

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      entries,
      comments,
      numEntryPages,
      currentEntryPage,
      entryStartPage,
      entryEndPage,
      currentUser
    } = this.props;
    const baseURL = `/?page=`;

    return (
      <ErrorBoundary>
        <div className="front-page p-3">
          <h1 className="text-center">Front Page</h1>
          <div className="front-page__latest-entries">
            <Pagination
              numPages={numEntryPages}
              baseURL={baseURL}
              currentPage={currentEntryPage}
              startPage={entryStartPage}
              endPage={entryEndPage}
            />
            <h2 className="mb-3 text-center">Latest Entries</h2>
            <Entries entries={entries} currentUser={currentUser} />
            <Pagination
              numPages={numEntryPages}
              baseURL={baseURL}
              currentPage={currentEntryPage}
              startPage={entryStartPage}
              endPage={entryEndPage}
            />
          </div>
          <div className="front-page__latest-comments">
            <h2 className="mb-3 text-center">Latest Comments</h2>
            <Comments comments={comments} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

FrontPage.defaultProps = {
  entries: [],
  comments: [],
  numEntryPages: 1
};
