import React from 'react';

export default class ProfileAside extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <aside className="profile-aside">
        <img className="profile-aside__image" src={user.profile_image_url} alt="No User Image"/>
        <div className="profile_aside__details mt-3">
          <div>{user.email}</div>
        </div>
      </aside>
    );
  }
}

ProfileAside.defaultProps = {
  user: {}
};
