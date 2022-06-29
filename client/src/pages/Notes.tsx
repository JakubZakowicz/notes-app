import React from 'react';
import { Link } from 'react-router-dom';
import { useGetNotes } from '../services/notes';
import PaginatedNotes from '../components/PaginatedNotes';
import Seo from '../components/Seo';
import ErrorHandler from '../components/ErrorHandler';
import Layout from '../components/Layout';
import { Note } from '../types';
import { getUser } from '../utils/auth';

const Notes: React.FC = () => {
  const { data, isLoading, isError, error } = useGetNotes();

  if (isError) return <ErrorHandler error={error} />;

  const userNotes: Note[] = [];
  const user = getUser();

  if (data) {
    data.notes.forEach(note => {
      console.log(note);
      let noteUser = note?.attributes?.user?.data;
      if (noteUser && noteUser.attributes.username === user?.username) {
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
        <PaginatedNotes notes={userNotes} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Notes;
