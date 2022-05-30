import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getNotes, addNote } from '../api/notes';
import { NotePost, NotesResponse } from '../types';

export const useGetNotes = (): UseQueryResult<NotesResponse, Error> =>
  useQuery<NotesResponse, Error>('notes', getNotes, {
    onError: err => console.log(err),
  });

export const useAddNote = (): UseMutationResult<Response, Error, NotePost> => {
  const navigate = useNavigate();
  return useMutation<Response, Error, NotePost>(addNote, {
    onSuccess: res => {
      console.log(res);
      navigate('/');
    },
  });
};
