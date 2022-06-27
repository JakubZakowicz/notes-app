import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import queryString from 'query-string';
import { Link, useNavigate } from 'react-router-dom';
import { Note } from '../types';
import Pagination from './Pagination';

const UserNotes: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const queryStringPageParam = queryString.parse(window.location.search).page;
  const [page, setPage] = useState<number>(
    queryStringPageParam ? Number(queryStringPageParam) : 1
  );
  const navigate = useNavigate();
  const [currentNotes, setCurrentNotes] = useState<Note[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentNotes(notes.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(notes.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, notes]);

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [navigate, page]);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % notes.length;
    setItemOffset(newOffset);
    setPage(e.selected + 1);
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 mt-5 gap-y-5">
        {currentNotes.map(note => (
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
        pageCount={pageCount}
        page={page}
        handlePageClick={handlePageClick}
      />
    </>
  );
};

export default UserNotes;
