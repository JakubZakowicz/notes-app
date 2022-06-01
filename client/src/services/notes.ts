import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  getNotes,
  getNote,
  addNote,
  deleteNote,
  updateNote,
} from '../api/notes';
import { NotePost, NotesResponse, NoteResponse, NotePut } from '../types';

export const useGetNotes = (): UseQueryResult<NotesResponse, Error> =>
  useQuery<NotesResponse, Error>('notes', getNotes);

export const useGetNote = (
  id: string | undefined
): UseQueryResult<NoteResponse, Error> =>
  useQuery<NoteResponse, Error>(['note', id], getNote);

export const useAddNote = (): UseMutationResult<Response, Error, NotePost> => {
  const navigate = useNavigate();
  return useMutation<Response, Error, NotePost>(addNote, {
    onSuccess: () => navigate('/'),
  });
};

export const useUpdateNote = (): UseMutationResult<
  Response,
  Error,
  NotePut
> => {
  const navigate = useNavigate();
  return useMutation<Response, Error, NotePut>(updateNote, {
    onSuccess: () => navigate('/'),
  });
};

export const useDeleteNote = (): UseMutationResult<Response, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, number>(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });
};
