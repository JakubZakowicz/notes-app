import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useDeleteNote, useGetNote, useUpdateNote } from '../services/notes';
import { NoteFormInputs } from '../types';
import { htmlToMarkdown, markdownToHtml } from '../utils/parsers';
import BackButton from '../components/BackButton';
import { BsFillTrashFill } from 'react-icons/bs';

const EditNote: React.FC<{}> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetNote(id);
  const { mutate: updateMutation } = useUpdateNote();
  const { mutate: deleteMutation } = useDeleteNote();
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
    updateMutation(requestData);
  };

  const deleteNote = () => {
    deleteMutation(Number(id));
    navigate('/');
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto xl:px-96 mt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-light-yellow rounded-2xl px-12 pt-4 pb-8"
      >
        <BackButton />
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mt-3">Edit Note</h1>
          <button
            type="button"
            onClick={deleteNote}
            className="transition hover:scale-125"
          >
            <BsFillTrashFill className="text-red-500 text-2xl mt-4" />
          </button>
        </div>
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
        <button className="bg-yellow-500 w-72 mt-20 py-2 rounded-lg text-white hover:bg-yellow-600 mx-auto">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNote;
