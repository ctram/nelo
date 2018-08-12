import React from 'react';
import Entry from './entry';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { entries } = this.props;
    let entriesDOM = <div className="text-center">'No entries'</div>;

    if (entries.length > 0) {
      entriesDOM = entries.map((entry, idx) => {
        return (
          <div key={entry.id}>
            <Entry entry={entry} />
            {idx !== entries.length - 1 && <hr />}
          </div>
        );
      });
    }

    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <h2 className="text-center">Entries</h2>
          {entriesDOM}
        </div>
      </div>
    );
  }
}
