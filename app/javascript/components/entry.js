import React from 'react';
import MarkupHelpers from './helpers/markup-helpers';
import CONSTANTS from '../constants';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entry, type, canEdit, canDelete, titleAsLink } = this.props;
    const { title: entryTitle, content: entryContent } = entry;
    let cssClass = 'entry d-flex ';
    let badgeDOM = null;
    let badgeContent = null;
    cssClass +=
      type === 'show-page'
        ? 'flex-column-reverse align-items-start entry--show-page'
        : 'justify-content-between entry--index-page';

    if (entry.privacy_level === 'private') {
      badgeContent = 'Private';
    } else if (entry.privacy_level === 'friends') {
      badgeContent = 'Friends';
    }

    if (badgeContent) {
      badgeDOM = <span className="badge badge-secondary ml-3">{badgeContent}</span>;
    }
    let titleDOM = <h4 className="d-inline">{entryTitle}</h4>;

    if (entry.id && titleAsLink) {
      const entryURL = CONSTANTS.appDomainURL + '/entries/' + entry.id;
      titleDOM = <a href={entryURL}>{titleDOM}</a>;
    }

    return (
      <div className={cssClass}>
        <div className="entry__details">
          {titleDOM}
          {badgeDOM}
          <div>
            <a href={CONSTANTS.appDomainURL + '/users/' + entry.author.id + '/entries'}>{entry.author.email}</a>
          </div>
          <div
            className="entry__content"
            dangerouslySetInnerHTML={MarkupHelpers.createMarkup(entryContent)}
          />
        </div>
        <div className={`entry__actions ${type === 'show-page' ? 'mb-3' : ''}`}>
          {canEdit && (
            <a className="btn btn-outline-primary btn-sm mr-3" href={CONSTANTS.appDomainURL + `/entries/${entry.id}/edit`}>
              Edit
            </a>
          )}
          {canDelete && (
            <button
              role="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                this.props.onClickDelete(this.props.entry.id);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}

Entry.defaultProps = {
  type: 'show-page',
  canEdit: false,
  canDelete: false,
  entry: {},
  titleAsLink: false
};
