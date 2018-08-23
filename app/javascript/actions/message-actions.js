import CONSTANTS from '../constants';

function fetchFrontPageMessages() {
  const destinationURL = CONSTANTS.appDomainURL + '/messages';
  return fetch(destinationURL);
}

export default { fetchFrontPageMessages };
