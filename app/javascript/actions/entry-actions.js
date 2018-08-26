import CONSTANTS from '../constants';
import ActionHelpers from './action-helpers';

function deleteEntry(id) {
  const destinationURL = CONSTANTS.APP_DOMAIN_URL + '/entries/' + id;
  const body = ActionHelpers.generateBody('DELETE');
  const request = ActionHelpers.newFormRequest(destinationURL, body);

  return fetch(request);
}

function fetchFrontPageEntries() {
  const destinationURL = CONSTANTS.APP_DOMAIN_URL + '/entries';
  return fetch(destinationURL);
}

export default {
  deleteEntry,
  fetchFrontPageEntries
};
