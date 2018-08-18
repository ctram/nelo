function generateContentDOM(content) {
  return content
    .replace(/<|>/g, '') // TODO: determine way for user to safely use brackets
    .replace(/\r\n/g, '<br/>')
    .replace(/ /g, '&nbsp;');
}
function createMarkup(content) {
  return { __html: generateContentDOM(content) };
}

export default {
  createMarkup,
  generateContentDOM
};
