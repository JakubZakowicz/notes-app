import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useGetNotes } from '../services/notes';
import Loader from '../components/Loader';
import ErrorHandler from '../components/ErrorHandler';
import Layout from '../components/Layout';

const Notes: React.FC = () => {
  const { data, isLoading, isError, error } = useGetNotes();

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
        {isLoading && (
          <div className="mt-20">
            <Loader />
          </div>
        )}
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 mt-5 gap-y-5">
          {data?.map(note => (
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
      </div>
    </Layout>
  );
};

export default Notes;
