import React from 'react';
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto">
      <button
        className="float-right"
        onClick={() => {localStorage.removeItem('jwt'); navigate('/auth/login')}}
      >
        Logout
      </button>
      <p>Notes</p>
    </div>
  );
};

export default Notes;
