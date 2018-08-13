import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    const {
      details: { cssID }
    } = props;

    $('#' + cssID).modal({});
  }

  componentDidMount() {
    this.toggleVisibility();
  }

  componentWillReceiveProps() {
    this.toggleVisibility();
  }

  toggleVisibility() {
    const {
      details: { cssID }
    } = this.props;

    $('#' + cssID).modal('toggle');
  }

  componentWillUnmount() {
    const {
      details: { cssID }
    } = this.props;

    $('#' + cssID).modal('dispose');
  }

  render() {
    const { details } = this.props;

    if (!details) {
      return null;
    }

    const { title, body, footer, cssID } = details;

    return (
      <div className={'modal'} id={cssID} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">{footer}</div>
          </div>
        </div>
      </div>
    );
  }
}
