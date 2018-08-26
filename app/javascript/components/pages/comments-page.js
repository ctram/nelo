import React from 'react';
import ErrorBoundary from '../error-boundary';
import Pagination from '../pagination';
import Comments from '../comments';
import CONSTANTS from '../../constants';

export default class EntryFormPage extends React.Component {
  render() {
    const { comments, currentUser, paginationDetails } = this.props;

    return (
      <ErrorBoundary>
        <div className="comments-page p-3">
          <Comments comments={comments} currentUser={currentUser} bylineType="with entry link" />
          <Pagination
            {...paginationDetails}
            baseURL={CONSTANTS.APP_DOMAIN_URL + '/users/' + currentUser.id + '/comments?page='}
          />
        </div>
      </ErrorBoundary>
    );
  }
}
