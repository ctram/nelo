import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible });
      this.toggleVisibility();
    }
  }

  toggleVisibility() {
    const { cssID } = this.props;
    $('#' + cssID).modal('toggle');
  }

  componentWillUnmount() {
    const { cssID } = this.props;
    $('#' + cssID).modal('dispose');
  }

  render() {
    const { details, cssID } = this.props;
    const { title, body, footer } = details;

    return (
      <div className="modal" id={cssID} tabIndex="-1" role="dialog">
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

Modal.defaultProps = {
  details: {}
};
