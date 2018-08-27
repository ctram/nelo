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
    this.onClickFriend = this.onClickFriend.bind(this);
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

  requestFriend(userID) {
    FriendActions.requestFriend(userID)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      })
      .then(({ friendship }) => {
        switch (friendship.status) {
          case 'confirmed':
            toastr.success('Friended.');
            break;
          case 'pending':
          case 'denied':
            toastr.success('Friend Request Sent.');
            break;
        }
        this.setState({ friendship });
      })
      .catch(e => {
        toastr.error('Error occurred while friending.');
        console.error(e);
      });
  }

  requestUnfriend(userID) {
    FriendActions.requestUnfriend(userID)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      })
      .then(({ friendship }) => {
        toastr.success('Unfriended.');
        this.setState({
          friendship
        });
      })
      .catch(e => {
        console.error(e);
        toastr.error('Error occurred while unfriending.');
      });
  }

  onClickFriend() {
    const { user } = this.props;
    const {
      friendship: { status }
    } = this.state;

    if (status === 'not_friends') {
      this.requestFriend(user.id);
    } else if (status === 'confirmed' || status === 'pending') {
      this.requestUnfriend(user.id);
    }
  }

  render() {
    const { friendship } = this.state;
    const { user, currentUser } = this.props;
    let friendButtonDisabled = false;
    let friendButtonText;

    switch (friendship.status) {
      case 'not_friends':
        friendButtonText = 'Friend';
        break;
      case 'confirmed':
        friendButtonText = 'Unfriend';
        break;
      case 'pending':
      case 'denied':
        friendButtonText = 'Cancel Friend Request';
        break;
      default:
        friendButtonDisabled = true;
        friendButtonText = 'Friend';
    }

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
                onClick={this.onClickFriend}
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
