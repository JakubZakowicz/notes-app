import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import { useGetNotes } from '../services/notes';

const Notes: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetNotes()

  if(isLoading) return <p>Loading...</p>

  if(isError) return <p>{error.message}</p>

  return (
    <div className="container mx-auto">
      <button
        className="float-right"
        onClick={() => {
          logout();
          navigate('/auth/login');
        }}
      >
        Logout
      </button>
      <p>Notes</p>
      {data?.data?.data?.map(note => (
        <div key={note.id} className="mt-5">
          <p>{note.attributes.title}</p>
          <p>{note.attributes.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
