import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import { useGetNotes } from '../services/notes';
import ReactMarkdown from 'react-markdown';

const Notes: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetNotes();

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
          <p>{note.attributes.title}</p>
          <p>
            <ReactMarkdown>{note.attributes.text}</ReactMarkdown>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
