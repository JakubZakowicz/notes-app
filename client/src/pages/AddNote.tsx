import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import TurndownService from 'turndown';
import { useAddNote } from '../services/notes';

import 'react-quill/dist/quill.snow.css';

const AddNote: React.FC<{}> = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const { mutate } = useAddNote();
  const turndownService = new TurndownService();

  const onEditorChange = (text: string): void => {
    setText(text);
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    const data = {
      data: {
        title: title === '' ? 'No title' : title,
        text: turndownService.turndown(text),
      },
    };
    mutate(data);
  };

  return (
    <div className="container mx-auto px-96 mt-20">
      <form onSubmit={onSubmit} className="flex flex-col">
        <h1>Add Note</h1>
        <label htmlFor="title" className="mt-5">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
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
          Login
        </button>
      </form>
    </div>
  );
};

export default AddNote;
