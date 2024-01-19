import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages, keyword = "" } = props;
  let pag = 1;
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page ? "active" : ""}`}
              key={x + 1}
            >
              <Link
                className="page-link"
                to={
                  keyword
                    ? `/AllProduct/search/${keyword}/page/${x + 1}`
                    : `/AllProduct/page/${x + 1}`
                }
              >
                {pag++}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
