import React, { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import TurndownService from 'turndown';
import { useGetNote, useUpdateNote } from '../services/notes';

const EditNote: React.FC<{}> = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetNote(id);
  const { mutate } = useUpdateNote();
  const turndownService = new TurndownService();

  const note = data?.data?.data;

  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  useEffect(() => {
    setTitle(note?.attributes.title ?? '');
    setText(note?.attributes.text ?? '');
  }, [note]);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onEditorChange = (text: string): void => {
    setText(text);
  };

  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    const data = {
      id,
      data: {
        title: title === '' ? 'No title' : title!,
        text: text === '' ? 'No text' : turndownService.turndown(text!),
      },
    };
    mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-96 mt-20">
      <form onSubmit={onSubmit} className="flex flex-col">
        <h1>Edit Note</h1>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNote;
