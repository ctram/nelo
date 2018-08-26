import React from 'react';
import MarkupHelpers from './helpers/markup-helpers';

export default class Profile extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div className="profile">
        <section
          className="profile__about"
          dangerouslySetInnerHTML={MarkupHelpers.createHTML(user.about)}
        />
        <section className="profile__spirit-animal">
          <div>
            <strong>Spirit Animal</strong>: {user.spirit_animal}
          </div>
        </section>
      </div>
    );
  }
}

Profile.defaultProps = {
  editMode: false
};
