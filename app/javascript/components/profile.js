import React from 'react';
import MarkupHelpers from './helpers/markup-helpers';

export default class Profile extends React.Component {
  render() {
    const { user } = this.props;
    let aboutContent = { __html: 'Whoops, nothing here.' };

    if (user.about) {
      aboutContent = MarkupHelpers.createHTML(user.about);
    }

    return (
      <div className="profile">
        <section className="profile__about mb-5">
          <h4>About</h4>
          <div dangerouslySetInnerHTML={aboutContent} />
        </section>
        <section className="profile__spirit-animal">
          <h4>Spirit Animal</h4>
          {user.spirit_animal}
        </section>
      </div>
    );
  }
}

Profile.defaultProps = {
  editMode: false
};
