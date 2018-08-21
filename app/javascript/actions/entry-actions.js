import CONSTANTS from '../constants';
import ActionHelpers from './action-helpers';

function deleteEntry(id) {
  const destinationURL = CONSTANTS.appDomainURL + '/entries/' + id;
  const body = ActionHelpers.generateBody('DELETE');
  const request = ActionHelpers.newFormRequest(destinationURL, body);

  return fetch(request).then(() => {
    window.location.href = CONSTANTS.appDomainURL;
  });
}

function fetchHomePageEntries() {
  const destinationURL = CONSTANTS.appDomainURL + '/entries';
  return fetch(destinationURL);
}

export default {
  deleteEntry,
  fetchHomePageEntries
};
