import React from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationProps } from '../types';

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  page,
  handlePageClick,
}) =>
  pageCount <= 1 ? (
    <></>
  ) : (
    <>
      <div className="flex justify-center">
        <ReactPaginate
          pageCount={pageCount}
          initialPage={page - 1}
          previousLabel="<"
          nextLabel=">"
          pageLinkClassName="bg-white text-black inline-flex items-center px-4 py-2 border border-gray-500 text-lg font-medium rounded-md hover:bg-yellow-400 transition"
          previousLinkClassName="inline-flex items-center px-4 py-2 rounded-l-md border border-gray-500 bg-white text-lg font-bold text-black hover:bg-yellow-400 transition"
          nextLinkClassName="inline-flex items-center px-4 py-2 rounded-r-md bg-white text-lg border border-gray-500 font-medium text-black hover:bg-yellow-400 transition"
          breakLabel="..."
          breakLinkClassName="inline-flex items-center px-4 py-2 bg-white text-lg font-medium text-black"
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="flex my-10 gap-4"
          activeLinkClassName="bg-yellow-400 text-white"
          onPageChange={handlePageClick}
        />
      </div>
    </>
  );

export default Pagination;
