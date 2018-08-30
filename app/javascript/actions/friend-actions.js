import CONSTANTS from '../constants';
import ActionHelpers from './action-helpers';

function updateFriendshipRequest(userID, action) {
  const destinationURL = CONSTANTS.APP_DOMAIN_URL + `/friendships`;
  const body = ActionHelpers.generateBody('PATCH', [{ key: 'friendship_action', value: action }, { key: 'user_id', value: userID }]);
  const request = ActionHelpers.newFormRequest(destinationURL, body);
  return fetch(request);
}

function createFriendshipRequest(friendeeID) {
  const destinationURL = CONSTANTS.APP_DOMAIN_URL + `/friendships`;
  const body = ActionHelpers.generateBody('POST', [
    { key: 'friendship[friendee_id]', value: friendeeID }
  ]);
  const request = ActionHelpers.newFormRequest(destinationURL, body);
  return fetch(request);
}

function checkFriendStatus(frienderID, friendeeID) {
  const destinationURL = CONSTANTS.APP_DOMAIN_URL + `/friendships`;
  const body = ActionHelpers.generateBody('GET', [
    { key: 'friendship[friender_id]', value: frienderID },
    { key: 'friendship[friendee_id]', value: friendeeID }
  ]);
  const request = ActionHelpers.newFormRequest(destinationURL, body);
  return fetch(request);
}

export default {
  createFriendshipRequest,
  checkFriendStatus,
  updateFriendshipRequest
};
