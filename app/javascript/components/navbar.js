import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand" href="#">
          Nelo
        </span>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
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
                <a className="nav-link" href="/users/sign_out">
                  Sign Out
                </a>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <a className="nav-link" href="/entries/new">
                  Add Entry
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
