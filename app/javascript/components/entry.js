import React from 'react';
import MarkupHelper from '../helpers/markup-helper';
import EntryActions from '../actions/entry-actions';
import CONSTANTS from '../constants';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    const { entry, currentUser } = this.props;

    const result = window.confirm(`Are you sure you want to delete "${entry.title}"?`);

    if (result) {
      EntryActions.deleteEntry(entry.id)
        .then(res => {
          if (res.ok) {
            toastr.success('Entry deleted.');
            return setTimeout(() => {
              window.location.href =
                CONSTANTS.APP_DOMAIN_URL + '/users/' + currentUser.id + '/entries';
            }, CONSTANTS.DELAY_BEFORE_REDIRECT);
          }
          toastr.info(res.status);
        })
        .catch(e => {
          toastr.error(e);
          console.error(e);
        });
    }
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
      badgeDOM = <span className="badge badge-secondary mr-3">{badgeContent}</span>;
    }
    let titleDOM = <h3 className="d-inline">{entryTitle}</h3>;

    if (entry.id && titleAsLink) {
      const entryURL = CONSTANTS.APP_DOMAIN_URL + '/entries/' + entry.id;
      titleDOM = <a href={entryURL}>{titleDOM}</a>;
    }

    return (
      <div className={cssClass}>
        <div className="entry__details">
          <div className="entry__title-and-badge">
            {badgeDOM}
            {titleDOM}
          </div>
          <div className="entry__byline mb-3">
            by{' '}
            <a href={CONSTANTS.APP_DOMAIN_URL + '/users/' + entry.author.id + '/entries'}>
              {entry.author.username}
            </a>
          </div>
          <div className={`entry__actions ${type === 'show-page' ? 'mb-3' : ''}`}>
            {canEdit && (
              <a className="mr-3" href={CONSTANTS.APP_DOMAIN_URL + `/entries/${entry.id}/edit`}>
                Edit
              </a>
            )}
            {canDelete && (
              <a href="#" className="" onClick={this.onClickDelete}>
                Delete
              </a>
            )}
          </div>
          <div
            className="entry__content"
            dangerouslySetInnerHTML={MarkupHelper.createHTML(entryContent)}
          />
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
