import React from 'react';
import MarkupHelper from '../helpers/markup-helper';
import FriendActions from '../actions/friend-actions';

export default class ProfileAside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendship: props.friendship
    };
    this.checkFriendStatus = this.checkFriendStatus.bind(this);
    this.friendButtonData = this.friendButtonData.bind(this);
    this.friendRequest = this.friendRequest.bind(this);
    this.unfriendRequest = this.unfriendRequest.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentDidMount() {
    this.checkFriendStatus();
  }

  checkFriendStatus() {
    const { user, currentUser } = this.props;

    if (currentUser) {
      return FriendActions.checkFriendStatus(currentUser.id, user.id)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.statusText);
        })
        .then(({ friendship }) => {
          this.setState({
            friendship: friendship || { status: 'not_friends' }
          });
        })
        .catch(e => {
          console.error(e);
          toastr.error('Error occurred while checking friend status.');
        });
    }

    return Promise.resolve();
  }

  friendRequest() {
    const { friendship } = this.state;
    const { user } = this.props;
    let promise;
    const successMessage = 'Friend Request Sent.';

    if (friendship) {
      promise = FriendActions.updateFriendshipRequest(user.id, 'confirm');
    } else {
      promise = FriendActions.createFriendshipRequest(user.id);
    }
    return this.handleResponse(promise, successMessage);
  }

  unfriendRequest() {
    const { user } = this.props;
    let promise = FriendActions.updateFriendshipRequest(user.id, 'deny');
    return this.handleResponse(promise);
  }

  handleResponse(promise, doneMessage) {
    return promise
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Error occurred processing request.');
      })
      .then(data => {
        const { friendship } = data;

        if (doneMessage) {
          toastr.success(doneMessage);
        }

        this.setState({ friendship });
      })
      .catch(toastr.error);
  }

  friendButtonData() {
    const { friendship } = this.state;
    const { currentUser } = this.props;
    let data = { disabled: true, onClick: () => {}, buttonText: 'Friend' };

    if (!friendship) {
      return data;
    }

    data.disabled = false;
    switch (friendship.status) {
      case 'not_friends':
        data = Object.assign(data, { onClick: this.friendRequest, buttonText: 'Friend' });
        break;
      case 'confirmed':
        data = Object.assign(data, { onClick: this.unfriendRequest, buttonText: 'Unfriend' });
        break;
      case 'pending':
      case 'denied':
        if (currentUser.id === friendship.friender.id) {
          data = Object.assign(data, {
            onClick: this.unfriendRequest,
            buttonText: 'Cancel Friend Request'
          });
        } else if (currentUser.id === friendship.friendee.id) {
          data = Object.assign(data, {
            onClick: this.friendRequest,
            buttonText: 'Confirm Friend Request'
          });
        }
    }
    return data;
  }

  render() {
    const { user, currentUser } = this.props;
    const {
      buttonText: friendButtonText,
      disabled: friendButtonDisabled,
      onClick: onClickFriend
    } = this.friendButtonData();

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
        {currentUser &&
          currentUser.id !== user.id && (
            <div className="profile-aside__actions mt-5">
              <button
                className="btn btn-primary"
                onClick={onClickFriend}
                disabled={friendButtonDisabled}
              >
                {friendButtonText}
              </button>
            </div>
          )}
        <div className="profile-aside__details mt-5">
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
  friendship: {}
};
