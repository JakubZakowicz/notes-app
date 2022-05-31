import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getNotes, addNote, deleteNote } from '../api/notes';
import { NotePost, NotesResponse } from '../types';

export const useGetNotes = (): UseQueryResult<NotesResponse, Error> =>
  useQuery<NotesResponse, Error>('notes', getNotes);

export const useAddNote = (): UseMutationResult<Response, Error, NotePost> => {
  const navigate = useNavigate();
  return useMutation<Response, Error, NotePost>(addNote, {
    onSuccess: () => navigate('/'),
  });
};

export const useDeleteNote = (): UseMutationResult<Response, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, number>(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });
};
