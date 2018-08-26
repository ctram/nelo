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
    const { entries, comments, currentUser, paginationDetails } = this.props;
    const baseURL = `/?page=`;

    return (
      <ErrorBoundary>
        <div className="front-page p-3 row justify-content-center">
          <div className="col-6">
            <div className="front-page__latest-entries mb-5">
              <h2 className="mb-3 text-center mb-3">Latest Entries</h2>
              <Entries entries={entries} currentUser={currentUser} />
              <Pagination {...paginationDetails} baseURL={baseURL} />
            </div>
            <div className="front-page__latest-comments mt-5">
              <h2 className="mb-3 text-center">Latest Comments</h2>
              <Comments comments={comments} bylineType="with entry link" />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

FrontPage.defaultProps = {
  entries: [],
  comments: [],
  currentUser: {}
};
