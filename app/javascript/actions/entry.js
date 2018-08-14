import CONSTANTS from '../constants';

function deleteEntry(id) {
  const authenticityToken = document.getElementsByTagName('meta')[1].getAttribute('content');

  const fd = new FormData();
  fd.set('authenticity_token', authenticityToken);
  fd.set('_method', 'DELETE');
  fd.set('utf8', '✓');

  fetch(CONSTANTS.appDomainURL + '/entries' + `/${id}`, { method: 'POST', body: fd }).then(() => {
    window.location.href = CONSTANTS.appDomainURL;
  });
}

export default {
  deleteEntry
};
