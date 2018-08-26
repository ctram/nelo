import React from 'react';
import Form from './form';

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    const { user } = props;
    this.state = {
      about: user.about,
      spiritAnimal: user.spirit_animal,
      username: user.username
    };
    this.originalContent = {
      about: user.about,
      spiritAnimal: user.spirit_animal,
      username: user.username
    };
    this.onChange = this.onChange.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }

  onClickCancel() {
    const { about, spiritAnimal, username } = this.state;
    const {
      about: originalAbout,
      spiritAnimal: originalSpiritAnimal,
      username: originalUsername
    } = this.originalContent;
    let result = false;

    if (
      about !== originalAbout ||
      spiritAnimal !== originalSpiritAnimal ||
      username !== originalUsername
    ) {
      result = window.confirm('Are you sure you want to leave without saving?');
    }

    if (result) {
      window.location.href = '/users/' + this.props.currentUser.id;
    }
  }

  onChange(e) {
    const value = e.target.value;
    const type = e.target.getAttribute('data-type');

    let state = Object.assign({}, this.state);
    state[type] = value;

    this.setState(state);
  }

  render() {
    const { about, spiritAnimal, username } = this.state;
    const { user } = this.props;
    const action = '/users/' + user.id;

    return (
      <Form method="PATCH" action={action} formID="profile-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            name="user[username]"
            data-type="username"
            className="form-control"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            value={about}
            name="user[about]"
            data-type="about"
            className="form-control"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="spirit-animal">Spirit Animal</label>
          <input
            value={spiritAnimal}
            name="user[spirit_animal]"
            data-type="spiritAnimal"
            className="form-control"
            onChange={this.onChange}
          />
        </div>
        <button className="btn btn-primary">Save</button>
        <button className="btn btn-secondary ml-3" onClick={this.onClickCancel}>
          Cancel
        </button>
      </Form>
    );
  }
}
