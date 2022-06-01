import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useGetNote, useUpdateNote } from '../services/notes';
import { NoteFormInputs } from '../types';
import { htmlToMarkdown, markdownToHtml } from '../utils/parsers';

const EditNote: React.FC<{}> = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetNote(id);
  const { mutate } = useUpdateNote();
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<NoteFormInputs>({
      defaultValues: { title: '', text: '' },
    });
  const text = watch('text');

  const note = data?.data?.data;

  useEffect(() => {
    
    const loadedDefaultValues = {
      title: note?.attributes.title ?? '',
      text: markdownToHtml(note?.attributes.text ?? ''),
    };

    reset(loadedDefaultValues);
  }, [note, reset]);

  const onEditorChange = (text: string): void => {
    setValue('text', text);
  };

  const onSubmit: SubmitHandler<NoteFormInputs> = (
    data: NoteFormInputs
  ): void => {
    const { title, text } = data;
    const requestData = {
      id,
      data: {
        title: title === '' ? 'No title' : title!,
        text: text === '' ? 'No text' : htmlToMarkdown(text!),
      },
    };
    mutate(requestData);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-96 mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <h1>Edit Note</h1>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNote;
