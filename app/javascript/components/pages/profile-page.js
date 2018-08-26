import React from 'react';
import ErrorBoundary from '../error-boundary';
import Profile from '../profile';
import ProfileForm from '../profile-form';

export default class ProfilePage extends React.Component {
  render() {
    const { editMode, user } = this.props;
    let dom;

    if (editMode) {
      dom = <ProfileForm user={user} />;
    } else {
      dom = <Profile user={user} />;
    }

    return (
      <ErrorBoundary>
        <div className="profile-page">{dom}</div>;
      </ErrorBoundary>
    );
  }
}

ProfilePage.defaultProps = {
  editMode: false
};
