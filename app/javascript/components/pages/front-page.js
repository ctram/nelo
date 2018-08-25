import React from 'react';
import Comments from '../comments';
import Entries from '../entries';
import ErrorBoundary from '../error-boundary';

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entries, comments } = this.props;

    return (
      <ErrorBoundary>
        <div className="front-page p-3">
          <h1 className="text-center">Front Page</h1>
          <div className="front-page__latest-entries">
            <h2 className="mb-3 text-center">Latest Entries</h2>
            <Entries entries={entries} />
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
  comments: []
};
