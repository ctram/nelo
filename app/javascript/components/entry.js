import React from 'react';
import MarkupHelpers from './helpers/markup-helpers';


export default class Entry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entry, type } = this.props;
    const { title: entryTitle, content: entryContent } = entry;
    let cssClass = 'entry d-flex ';
    cssClass +=
      type === 'show-page'
        ? 'flex-column-reverse align-items-start entry--show-page'
        : 'justify-content-between entry--index-page';

    return (
      <div className={cssClass}>
        <div className="entry__details">
          <h3>{entryTitle}</h3>
          <div
            className="entry__content"
            dangerouslySetInnerHTML={MarkupHelpers.createMarkup(entryContent)}
          />
        </div>
        <div className={`entry__actions ${type === 'show-page' ? 'mb-3' : ''}`}>
          <button
            type="button"
            className="btn btn-outline-primary btn-small mr-3"
            onClick={this.props.onClickEdit}
          >
            Edit
          </button>
          <button
            role="button"
            className="btn btn-outline-danger btn-small"
            onClick={() => {
              this.props.onClickDelete(this.props.entry.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Entry.defaultProps = {
  type: 'show-page'
};
