import React from 'react';
import EntryForm from '../entry-form';
import ErrorBoundary from '../error-boundary';

export default class EntryFormPage extends React.Component {
  render() {
    const { entry, currentUser } = this.props;

    return (
      <ErrorBoundary>
        <div className="entry-form-page p-3">
          <h1>Entries</h1>
          <EntryForm entry={entry} currentUser={currentUser} />
        </div>
      </ErrorBoundary>
    );
  }
}

EntryFormPage.defaultProps = {
  user: {},
  currentUser: {}
};
