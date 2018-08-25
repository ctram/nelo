import React from 'react';

function PageItem(props) {
  let { baseURL, num, type, active, disabled } = props;
  disabled = disabled || active;

  if (type === 'prev') {
    num = 'Previous';
  } else if (type === 'next') {
    num = 'Next';
  }

  const url = baseURL + `${num}`;

  return (
    <li className={`page-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
      <a className="page-link" href={url}>
        {num}
      </a>
    </li>
  );
}

export default class Pagination extends React.Component {
  render() {
    let { numPages, baseURL, currentPage, startPage, endPage } = this.props;
    let pageItems = [];
    let disablePrevAndNext = numPages === 1;

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(<PageItem num={i} baseURL={baseURL} active={currentPage === i} key={i} />);
    }

    pageItems.unshift(
      <PageItem type="prev" baseURL={baseURL} disabled={disablePrevAndNext} key="prev" />
    );

    pageItems.push(
      <PageItem type="next" baseURL={baseURL} disabled={disablePrevAndNext} key="next" />
    );

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{pageItems}</ul>
      </nav>
    );
  }
}
