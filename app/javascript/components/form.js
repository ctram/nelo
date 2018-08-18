import React from 'react';

export default class Form extends React.Component {
  componentDidMount() {
    const { formID } = this.props;

    if (!formID) {
      return;
    }

    document.getElementById(formID).onkeypress = e => {
      if (e.target.nodeName === 'TEXTAREA') {
        return;
      }
      var key = e.charCode || e.keyCode || 0;
      if (key == 13) {
        e.preventDefault();
      }
    };
  }

  render() {
    const authenticityToken = document.getElementsByTagName('meta')[1].getAttribute('content');

    const { method, action, children, formID } = this.props;

    return (
      <form
        id={formID}
        action={action}
        method="POST"
        acceptCharset="UTF-8"
        onSubmit={this.props.onSubmit}
      >
        <input name="_method" type="hidden" value={method} />
        <input name="utf8" type="hidden" value="✓" />
        <input type="hidden" name="authenticity_token" value={authenticityToken} />
        {children}
      </form>
    );
  }
}
