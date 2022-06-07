import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useGetNotes } from '../services/notes';
import Loader from '../components/Loader';
import ErrorHandler from '../components/ErrorHandler';
import Layout from '../components/Layout';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const queryStringPageParam = queryString.parse(window.location.search).page;
  const [page, setPage] = useState<number>(
    queryStringPageParam ? Number(queryStringPageParam) : 1
  );
  const { data, isLoading, isError, error } = useGetNotes(page);

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [navigate, page]);

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
  };

  if (isError) return <ErrorHandler error={error} />;

  return (
    <Layout>
      <div className="px-10 xl:px-20">
        <Link
          to="notes/create"
          className="bg-green-500 hover:bg-green-600 text-xl text-white rounded-xl py-2 px-4"
        >
          New Note
        </Link>
        {isLoading ? (
          <div className="mt-20">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 mt-5 gap-y-5">
              {data?.notes?.map(note => (
                <React.Fragment key={note.id}>
                  <Link to={`/notes/edit/${note.id}`}>
                    <div className="mt-5 bg-light-yellow w-[400px] h-[300px] px-8 py-5 rounded-3xl shadow-xl transition hover:scale-110">
                      <div className="flex justify-between">
                        <h2 className="text-xl font-semibold">
                          {note.attributes.title}
                        </h2>
                      </div>
                      <div className="h-52 overflow-hidden">
                        <ReactMarkdown className="mt-4">
                          {note.attributes.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-center">
              <ReactPaginate
                pageCount={data?.pageCount!}
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
        )}
      </div>
    </Layout>
  );
};

export default Notes;
