import React from 'react';
import ErrorBoundary from './error-boundary';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <ErrorBoundary>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Nelo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              {!currentUser && (
                <li className="nav-item">
                  <a className="nav-link" href="/users/sign_up">
                    Register
                  </a>
                </li>
              )}
              {!currentUser && (
                <li className="nav-item">
                  <a className="nav-link" href="/users/sign_in">
                    Sign In
                  </a>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <a className="nav-link" href={`/users/${currentUser.id}/entries/new`}>
                    Add Entry
                  </a>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <a className="nav-link" href={`/users/${currentUser.id}/entries`}>
                    Entries
                  </a>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <a className="nav-link" href="/users/sign_out">
                    Sign Out
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </ErrorBoundary>
    );
  }
}
