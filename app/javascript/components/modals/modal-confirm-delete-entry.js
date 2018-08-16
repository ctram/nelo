import React from 'react';
import Modal from './modal';

export default class ModalConfirmDeleteEntry extends React.Component {
  render() {
    const { visible, itemToDeleteID } = this.props;

    const title = 'Are You Sure?';
    const body = 'This cannot be undone.';
    const footer = (
      <div>
        <button
          className="btn btn-danger mr-3"
          onClick={() => {
            this.props.onDelete(itemToDeleteID);
          }}
        >
          Delete
        </button>
        <button className="btn btn-info" onClick={this.props.onCancel}>
          Cancel
        </button>
      </div>
    );

    return <Modal cssID="areYouSure" title={title} body={body} footer={footer} visible={visible} />;
  }
}

Modal.defaultProps = {
  details: {}
};
