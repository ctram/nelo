import CONSTANTS from '../constants';

function deleteEntry(id) {
  const authenticityToken = document.getElementsByTagName('meta')[1].getAttribute('content');
  const destinationURL = CONSTANTS.appDomainURL + '/entries/' + id;
  const body = `authenticity_token=${authenticityToken}&utf8=✓&_method=DELETE`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const request = new Request(destinationURL, { method: 'POST', body, headers });

  fetch(request).then(() => {
    window.location.href = CONSTANTS.appDomainURL;
  });
}

export default {
  deleteEntry
};
