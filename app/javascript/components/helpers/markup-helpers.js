export default {
  generateContentDOM: content => {
    return content
      .replace(/<|>/g, '') // TODO: determine way for user to safely use brackets
      .replace(/\r\n/g, '<br/>')
      .replace(/ /g, '&nbsp;');
  },

  createMarkup: content => {
    return { __html: this.generateContentDOM(content) };
  }
};
