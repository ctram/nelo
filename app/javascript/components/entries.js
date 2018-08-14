import React from 'react';
import Entry from './entry';
import Modal from './modal';
import CONSTANTS from '../constants';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.areYouSureDelete = this.areYouSureDelete.bind(this);

    this.state = {
      modalAreYouSureVisible: false
    };
  }

  delete(id) {
    const authenticityToken = document.getElementsByTagName('meta')[1].getAttribute('content');

    const fd = new FormData();
    fd.set('authenticity_token', authenticityToken);

    fetch(CONSTANTS.appDomainURL + '/entries' + `/${id}`, { method: 'DELETE', body: fd }).then(
      () => {
        window.location.href = CONSTANTS.appDomainURL;
      }
    );
  }

  edit(id) {
    window.location.href = CONSTANTS + '/entries/' + `${id}`;
  }

  cancelDelete() {
    this.setState({ modalAreYouSureVisible: false });
  }

  areYouSureDelete(id) {
    const modalDetails = {
      cssID: 'areYouSure',
      title: 'Are You Sure?',
      content: 'This cannot be undone.',
      footer: (
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.delete(id);
            }}
          >
            Delete
          </button>
          <button className="btn btn-info" onClick={this.cancelDelete}>
            Cancel
          </button>
        </div>
      )
    };

    this.setState({ modalAreYouSureVisible: true, modalDetails });
  }

  render() {
    let { entries } = this.props;
    const { modalDetails, modalAreYouSureVisible } = this.state;
    let entriesDOM = <div className="text-center">No entries</div>;

    if (entries.length > 0) {
      entriesDOM = entries.map((entry, idx) => {
        return (
          <div key={entry.id}>
            <Entry entry={entry} onDelete={this.areYouSureDelete} />
            {idx !== entries.length - 1 && <hr />}
          </div>
        );
      });
    }

    return (
      <div className="row justify-content-center">
        <Modal cssID="modal-are-you-sure" details={modalDetails} visible={modalAreYouSureVisible} />
        <div className="col-6">
          <h2 className="text-center">Entries</h2>
          {entriesDOM}
        </div>
      </div>
    );
  }
}
