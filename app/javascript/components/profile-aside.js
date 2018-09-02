import React from 'react';
import MarkupHelper from '../helpers/markup-helper';
import FriendActions from '../actions/friend-actions';

export default class ProfileAside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendship: props.friendship,
      friendButtonDisabled: true
    };
    this.checkFriendStatus = this.checkFriendStatus.bind(this);
    this.friendButtonData = this.friendButtonData.bind(this);
    this.friendButtonDataAsFriender = this.friendButtonDataAsFriender.bind(this);
    this.friendButtonDataAsFriendee = this.friendButtonDataAsFriendee.bind(this);
    this.friendRequest = this.friendRequest.bind(this);
    this.unfriendRequest = this.unfriendRequest.bind(this);
    this.deleteFriendRequest = this.deleteFriendRequest.bind(this);
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
            friendship,
            friendButtonDisabled: false
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
    let successMessage;

    if (friendship) {
      successMessage = 'Friend Accepted.';
      promise = FriendActions.updateFriendshipRequest(user.id, 'confirm');
    } else {
      successMessage = 'Friend Request Sent.';
      promise = FriendActions.createFriendshipRequest(user.id);
    }
    return this.handleResponse(promise, successMessage);
  }

  unfriendRequest() {
    const { user } = this.props;
    let promise = FriendActions.updateFriendshipRequest(user.id, 'unconfirm');
    return this.handleResponse(promise, 'Unfriended.');
  }

  deleteFriendRequest() {
    const { friendship } = this.state;
    let promise = FriendActions.deleteFriendRequest(friendship.id);
    return this.handleResponse(promise, 'Unfriended.');
  }

  handleResponse(promise, doneMessage) {
    return promise
      .then(res => {
        if (res.ok) {
          return res.status === 204 ? { friendship: null } : res.json();
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

  friendButtonDataAsFriender(data) {
    let friendButtonText;
    const { friendship } = this.state;

    if (friendship.status === 'pending') {
      friendButtonText = 'Cancel Friend Request';
    } else if (friendship.status === 'confirmed') {
      friendButtonText = 'Unfriend';
    }

    return Object.assign(data, {
      friendButtonText,
      friendButtonOnClick: this.deleteFriendRequest
    });
  }

  friendButtonDataAsFriendee(data) {
    const { friendship } = this.state;
    if (friendship.status === 'pending') {
      data = Object.assign(data, {
        friendButtonText: 'Accept Friend Request',
        friendButtonOnClick: this.friendRequest
      });
    } else if (friendship.status === 'confirmed') {
      data = Object.assign(data, {
        friendButtonText: 'Unfriend',
        friendButtonOnClick: this.unfriendRequest
      });
    }

    return data;
  }

  friendButtonData() {
    const { currentUser } = this.props;
    const { friendship } = this.state;
    let data = {
      friendButtonText: 'Friend',
      friendButtonOnClick: this.friendRequest
    };

    if (!friendship) {
      return data;
    }

    if (currentUser.id === friendship.friender.id) {
      data = this.friendButtonDataAsFriender(data);
    } else {
      data = this.friendButtonDataAsFriendee(data);
    }

    return data;
  }

  render() {
    const { user, currentUser } = this.props;
    const { friendButtonDisabled } = this.state;
    const { friendButtonText, friendButtonOnClick } = this.friendButtonData();

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
                onClick={friendButtonOnClick}
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
  friendship: null
};
