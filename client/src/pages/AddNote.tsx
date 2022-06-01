import React from 'react';
import ReactQuill from 'react-quill';
import { useForm, SubmitHandler } from "react-hook-form"
import { useAddNote } from '../services/notes';
import { NoteFormInputs } from '../types';

import 'react-quill/dist/quill.snow.css';
import { htmlToMarkdown } from '../utils/parsers';

const AddNote: React.FC<{}> = () => {
  const { mutate } = useAddNote();
  const { register, handleSubmit, setValue, watch } = useForm<NoteFormInputs>()
  const text = watch('text')
  
  const onEditorChange = (text: string): void => {
    setValue('text', text)
  };

  const onSubmit: SubmitHandler<NoteFormInputs> = (data: NoteFormInputs): void => {
    const { title, text } = data
    const requestData = {
      data: {
        title: title === '' ? 'No title' : title,
        text: text === '' ? 'No text' : htmlToMarkdown(text),
      },
    };
    mutate(requestData);
  };

  return (
    <div className="container mx-auto px-96 mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <h1>Add Note</h1>
        <label htmlFor="title" className="mt-5">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="border"
        />
        <label htmlFor="title" className="mt-5">
          Text
        </label>
        <ReactQuill
          className="h-40"
          theme="snow"
          placeholder="Start writing..."
          value={text}
          onChange={onEditorChange}
        />
        <button className="bg-yellow-500 w-full mt-20 py-2 rounded-lg text-white hover:bg-yellow-600">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNote;
