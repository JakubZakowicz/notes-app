import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import queryString from 'query-string';
import { Link, useNavigate } from 'react-router-dom';
import { Note } from '../types';
import Pagination from './Pagination';
import Loader from './Loader';

const UserNotes: React.FC<{
  notes: Note[];
  isLoading: boolean;
}> = ({ notes, isLoading }) => {
  const queryStringPageParam = queryString.parse(window.location.search).page;
  const [page, setPage] = useState<number>(
    queryStringPageParam ? Number(queryStringPageParam) : 1
  );
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [currentNotes, setCurrentNotes] = useState<Note[]>([]);
  const pageCount = Math.ceil(notes.length / itemsPerPage);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItemOffset((page - 1) * itemsPerPage);
    const endOffset = itemOffset + itemsPerPage;
    setCurrentNotes(notes.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, notes, page, setCurrentNotes]);

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [navigate, page, pageCount]);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % notes.length;
    setItemOffset(newOffset);
    setPage(e.selected + 1);
  };

  const handleSearch = (e: any) => {
    const filteredNotes = notes.filter(note =>
      note.attributes.title.toLowerCase().includes(e.target.value)
    );
    setCurrentNotes(filteredNotes);
    if (page !== 1) setPage(1);
  };

  return (
    <div>
      <input
        className="mt-10 w-full p-3 rounded-2xl border-2 border-gray-300"
        placeholder="Search notes..."
        onChange={handleSearch}
      />
      {isLoading ? (
        <div className="mt-20">
          <Loader />
        </div>
      ) : (
        <>
          {currentNotes.length === 0 ? (
            <p className="absolute top-72 left-1/2 transform -translate-x-1/2 t text-4xl font-medium">
              There are no notes. Add one
            </p>
          ) : (
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
          )}
        </>
      )}
    </div>
  );
};

export default UserNotes;
