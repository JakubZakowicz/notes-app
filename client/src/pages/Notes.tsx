import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import queryString from 'query-string';
import { useGetNotes } from '../services/notes';
import Pagination from '../components/Pagination';
import Seo from '../components/Seo';
import Loader from '../components/Loader';
import ErrorHandler from '../components/ErrorHandler';
import Layout from '../components/Layout';
import { Note } from '../types';
import { getUser } from '../utils/auth';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const queryStringPageParam = queryString.parse(window.location.search).page;
  const [page, setPage] = useState<number>(
    queryStringPageParam ? Number(queryStringPageParam) : 1
  );
  const { data, isLoading, isError, error } = useGetNotes(page);
  let userNotes: Note[] = [];
  const user = getUser();

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [navigate, page]);

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
  };

  if (isError) return <ErrorHandler error={error} />;

  if (data) {
    data.notes.forEach(note => {
      let noteUser = note.attributes.user;
      if (noteUser.data.attributes.username === user.username) {
        userNotes.push(note);
      }
    });
  }

  return (
    <Layout>
      <Seo title="Notes" />
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
              {userNotes.map(note => (
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
            <Pagination
              pageCount={data?.pageCount!}
              page={page}
              handlePageClick={handlePageClick}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Notes;
