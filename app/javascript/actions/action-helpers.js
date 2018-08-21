const authenticityToken = document.getElementsByTagName('meta')[1].getAttribute('content');
const headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded');

function generateBody(method) {
  return `authenticity_token=${encodeURIComponent(
    authenticityToken
  )}&utf8=✓&_method=${method.toUpperCase()}`;
}

function newFormRequest(destinationURL, body) {
  return new Request(destinationURL, { method: 'POST', body, headers });
}

export default {
  generateBody,
  newFormRequest
};
