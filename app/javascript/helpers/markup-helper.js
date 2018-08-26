function sanitizeContent(content) {
  if (!content) {
    console.warn('Attempted to sanitize null or undefined content from MarkupHelper');
    return '';
  }

  return content
    .replace(/<|>/g, '') // TODO: determine way for user to safely use brackets
    .replace(/\r\n/g, '<br/>')
    .replace(/ /g, '&nbsp;');
}
function createHTML(content) {
  return { __html: sanitizeContent(content) };
}

export default {
  createHTML
};
