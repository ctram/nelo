import React from 'react';

function PaginationItem(props) {
  let { baseURL, num, type } = props;

  if (type === 'prev') {
    num = 'Previous';
  } else if (type === 'next') {
    num = 'Next';
  }

  const url = baseURL + `/${num}`;

  return (
    <li class="page-item">
      <a class="page-link" href={url}>
        {num}
      </a>
    </li>
  );
}

export default class Pagination extends React.Component {
  render() {
    const { numPages, startNum, baseURL } = this.props;
    let paginationItems = [<PaginationItem type="prev" startNum={startNum} baseURL={baseURL} />];

    for (let i = 1; i < numPages; i++) {
      paginationItems.push(<PaginationItem num={i + startNum} baseURL={baseURL} />);
    }

    paginationItems.push(
      <PaginationItem type="next" lastNum={numPages + startNum - 1} baseURL={baseURL} />
    );

    return (
      <nav aria-label="Page navigation example">
        <ul class="pagination">{paginationItems}</ul>
      </nav>
    );
  }
}
