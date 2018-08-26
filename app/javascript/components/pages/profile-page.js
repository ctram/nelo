import React from 'react';
import ErrorBoundary from '../error-boundary';
import Profile from '../profile';
import ProfileForm from '../profile-form';

export default class ProfilePage extends React.Component {
  render() {
    const { editMode, user, currentUser } = this.props;
    let profileDOM;
    let actionDOM;

    if (editMode) {
      profileDOM = <ProfileForm user={user} />;
    } else {
      profileDOM = <Profile user={user} />;
    }

    if (!editMode && currentUser) {
      actionDOM = user.id === currentUser.id && (
        <div className="profile-page__actions mb-5">
          <a href={'/users/' + user.id + '/edit'} className="btn btn-primary btn-sm">
            Edit
          </a>
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <div className="profile-page p-5 row justify-content-center">
          <div className="col-6">
            <h1 className="text-center">{user.email}</h1>
            {actionDOM}
            {profileDOM}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

ProfilePage.defaultProps = {
  editMode: false,
  user: {}
};
