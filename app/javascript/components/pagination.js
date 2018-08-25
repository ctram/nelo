import React from 'react';

function PageItem(props) {
  let { baseURL, num, type, active, disabled } = props;
  disabled = disabled || active;
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
    let { numPages, baseURL, currentPage, startPage, endPage } = this.props;
    let pageItems = [];

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(<PageItem num={i} baseURL={baseURL} active={currentPage === i} key={i} />);
    }

    pageItems.unshift(
      <PageItem
        type="prev"
        baseURL={baseURL}
        disabled={currentPage === 1}
        key="prev"
        num={currentPage - 1}
      />
    );

    pageItems.push(
      <PageItem
        type="next"
        baseURL={baseURL}
        disabled={currentPage === (startPage + numPages - 1)}
        key="next"
        num={currentPage + 1}
      />
    );

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{pageItems}</ul>
      </nav>
    );
  }
}
