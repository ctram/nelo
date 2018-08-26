import React from 'react';

function PageItem(props) {
  let { baseURL, num, type, active, disabled } = props;
  let content = num;

  if (type === 'prev') {
    content = 'Previous';
  } else if (type === 'next') {
    content = 'Next';
  }

  const url = baseURL + `${num}`;

  return (
    <li className={`page-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
      <a className="page-link" href={url}>
        {content}
      </a>
    </li>
  );
}

export default class Pagination extends React.Component {
  render() {
    let { num_pages: numPages, baseURL, page, start_page: startPage, end_page: endPage } = this.props;
    let pageItems = [];

    if (numPages <= 1) {
      return null;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(<PageItem num={i} baseURL={baseURL} active={page === i} key={i} />);
    }

    pageItems.unshift(
      <PageItem
        type="prev"
        baseURL={baseURL}
        disabled={page === 1}
        key="prev"
        num={page - 1}
      />
    );

    pageItems.push(
      <PageItem
        type="next"
        baseURL={baseURL}
        disabled={page === startPage + numPages - 1}
        key="next"
        num={page + 1}
      />
    );

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-sm">{pageItems}</ul>
      </nav>
    );
  }
}
