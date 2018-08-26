import React from 'react';
import MarkupHelper from '../helpers/markup-helper';

export default class Profile extends React.Component {
  render() {
    const { user } = this.props;
    let aboutContent = { __html: 'Whoops, nothing here.' };

    if (user.about) {
      aboutContent = MarkupHelper.createHTML(user.about);
    }

    return (
      <div className="profile">
        <section className="mb-5">
          <h4>Username</h4>
          {user.username}
        </section>
        <section className="profile__about mb-5">
          <h4>About</h4>
          <div dangerouslySetInnerHTML={aboutContent} />
        </section>
        <section className="profile__spirit-animal">
          <h4>Spirit Animal</h4>
          {user.spirit_animal || 'Whoops, no animal!'}
        </section>
      </div>
    );
  }
}

Profile.defaultProps = {
  editMode: false
};
