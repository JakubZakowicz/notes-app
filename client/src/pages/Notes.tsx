import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import { useGetNotes, useDeleteNote } from '../services/notes';
import ReactMarkdown from 'react-markdown';

const Notes: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetNotes();
  const { mutate } = useDeleteNote();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <div className="container mx-auto relative">
      <button
        className="float-right"
        onClick={() => {
          logout();
          navigate('/auth/login');
        }}
      >
        Logout
      </button>
      <p className="my-5">Notes</p>
      <Link to="notes/create" className="bg-green-500 text-white rounded p-1">
        New Note
      </Link>
      {data?.data?.data?.map(note => (
        <div key={note.id} className="mt-5">
          <div className="flex justify-between">
            <p>{note.attributes.title}</p>
            <div>
              <Link
                to={`/notes/edit/${note.id}`}
                className="mr-5 text-yellow-500"
              >
                edit
              </Link>
              <button onClick={() => mutate(note.id)} className="text-red-500">
                delete
              </button>
            </div>
          </div>
          <ReactMarkdown>{note.attributes.text}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default Notes;
