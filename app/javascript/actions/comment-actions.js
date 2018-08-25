import CONSTANTS from '../constants';

function fetchFrontPageComments() {
  const destinationURL = CONSTANTS.appDomainURL + '/comments';
  return fetch(destinationURL);
}

export default { fetchFrontPageComments };
