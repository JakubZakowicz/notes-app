import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getToken } from '../services/auth';
import { logout } from '../services/auth';
import axios from 'axios';

interface Note {
  id: number;
  attributes: { title: string; text: string };
}

interface ApiResponse {
  data: { data: Note[] } ;
}

const Notes: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>(
    'notes',
    async (): Promise<ApiResponse> => {
      return await axios.get('http://localhost:1337/api/notes', {
        headers: { Authorization: 'Bearer ' + getToken() },
      });
    },
    {
      onError: err => console.log(err),
    }
  );

  if(isLoading) return <p>Loading...</p>

  if(isError) return <p>{error.message}</p>

  console.log(data);

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
