import { AxiosError, AxiosResponse } from 'axios';
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
import { Note, AddNoteData, UpdateNoteData } from '../types';

export const useGetNotes = (): UseQueryResult<Note[], AxiosError> =>
  useQuery<Note[], AxiosError>('notes', getNotes);

export const useGetNote = (id: number) =>
  useQuery<Note, AxiosError>(['note', id], () => getNote(id));

export const useAddNote = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  AddNoteData
> => {
  const navigate = useNavigate();
  return useMutation<AxiosResponse, AxiosError, AddNoteData>(addNote, {
    onSuccess: () => navigate('/'),
  });
};

export const useUpdateNote = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  UpdateNoteData
> => {
  const navigate = useNavigate();
  return useMutation<AxiosResponse, AxiosError, UpdateNoteData>(updateNote, {
    onSuccess: () => navigate('/'),
  });
};

export const useDeleteNote = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  number
> => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, number>(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });
};
