import React from 'react';
import ReactQuill from 'react-quill';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAddNote } from '../services/notes';
import { NoteFormInputs } from '../types';
import { htmlToMarkdown } from '../utils/parsers';
import ErrorHandler from '../components/ErrorHandler';
import BackButton from '../components/BackButton';

import 'react-quill/dist/quill.snow.css';

const AddNote: React.FC = () => {
  const { mutate, isLoading, isError, error } = useAddNote();
  const { register, handleSubmit, setValue, watch } = useForm<NoteFormInputs>();
  const text = watch('text');

  const onEditorChange = (text: string): void => {
    setValue('text', text);
  };

  const onSubmit: SubmitHandler<NoteFormInputs> = (
    data: NoteFormInputs
  ): void => {
    const { title, text } = data;
    const requestData = {
      data: {
        title: title === '' ? 'No title' : title,
        text:
          text === '' || text === undefined ? 'No text' : htmlToMarkdown(text),
      },
    };
    mutate(requestData);
  };

  if (isError) return <ErrorHandler error={error} />;

  return (
    <div className="container mx-auto xl:px-96 mt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-light-yellow rounded-2xl px-12 pt-4 pb-8"
      >
        <BackButton />
        <h1 className="text-2xl font-semibold mt-3">Add Note</h1>
        <label htmlFor="title" className="mt-5 text-lg">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          {...register('title')}
          className="border h-12 rounded-xl pl-5"
        />
        <label htmlFor="text" className="mt-5 text-lg">
          Text
        </label>
        <ReactQuill
          className="bg-white h-80"
          theme="snow"
          id="text"
          placeholder="Start writing..."
          value={text}
          onChange={onEditorChange}
        />
        <button
          className="bg-yellow-500 w-72 mt-20 py-2 rounded-lg text-white hover:bg-yellow-600 mx-auto"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddNote;
