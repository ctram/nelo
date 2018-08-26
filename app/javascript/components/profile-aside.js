import React from 'react';
import MarkupHelper from '../helpers/markup-helper';

export default class ProfileAside extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <aside className="profile-aside px-5">
        <a href={'/users/' + user.id}>
          <h1 className="mb-5">{user.username}</h1>
        </a>
        <img
          className="profile-aside__image my-3"
          src={user.profile_image_url}
          alt="No User Image"
        />
        <div className="profile_aside__details mt-5">
          <h2>About</h2>
          <div dangerouslySetInnerHTML={MarkupHelper.createHTML(user.about)} />
          <h2 className="mt-5">Spirit Animal</h2>
          {user.spirit_animal}
        </div>
      </aside>
    );
  }
}

ProfileAside.defaultProps = {
  user: {}
};
