import CONSTANTS from '../constants';
import ActionHelpers from './action-helpers';

function fetchHomePageMessages() {
  const destinationURL = CONSTANTS.appDomainURL + '/messages';
  return fetch(destinationURL);
}

export default { fetchHomePageMessages };
