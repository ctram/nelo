import CONSTANTS from '../constants';
import ActionHelpers from './action-helpers';

function fetchFrontPageComments() {
  const destinationURL = CONSTANTS.APP_DOMAIN_URL + '/comments';
  return fetch(destinationURL);
}

function deleteComment(id) {
  const destinationURL = CONSTANTS.APP_DOMAIN_URL + '/comments/' + id;
  const body = ActionHelpers.generateBody('DELETE');
  const request = ActionHelpers.newFormRequest(destinationURL, body);

  return fetch(request);
}

export default { fetchFrontPageComments, deleteComment };
