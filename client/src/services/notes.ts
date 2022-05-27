import { useQuery, UseQueryResult } from 'react-query';
import { getNotes } from '../api/notes';
import { NotesResponse } from '../types';

export const useGetNotes = (): UseQueryResult<NotesResponse, Error> =>
  useQuery<NotesResponse, Error>('notes', getNotes, {
    onError: err => console.log(err),
  });
