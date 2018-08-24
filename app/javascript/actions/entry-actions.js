import CONSTANTS from '../constants';
import ActionHelpers from './action-helpers';

function deleteEntry(id) {
  const destinationURL = CONSTANTS.appDomainURL + '/entries/' + id;
  const body = ActionHelpers.generateBody('DELETE');
  const request = ActionHelpers.newFormRequest(destinationURL, body);

  return fetch(request);
}

function fetchFrontPageEntries() {
  const destinationURL = CONSTANTS.appDomainURL + '/entries';
  return fetch(destinationURL);
}

export default {
  deleteEntry,
  fetchFrontPageEntries
};
