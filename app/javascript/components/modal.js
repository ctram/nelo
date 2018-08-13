import React from 'react';

export default class Modal extends React.Component {
  render() {
    const {
      visible,
      details: { title, body, footer }
    } = this.props;

    return (
      <div className={'modal ' + (visible ? '' : 'd-none')} tabindex="-1" role="dialog">
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
