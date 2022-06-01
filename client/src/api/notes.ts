import { QueryFunctionContext } from 'react-query';
import { getToken } from '../services/auth';
import { NotesResponse, NoteResponse, NotePost, NotePut } from '../types';
import api from './api';

const authorizationHeader = {
  headers: { Authorization: `Bearer ${getToken()}` },
};

export const getNotes = async (): Promise<NotesResponse> =>
  await api.get('/notes', authorizationHeader);

export const getNote = async (
  context: QueryFunctionContext
): Promise<NoteResponse> =>
  await api.get(`/notes/${context.queryKey[1]}`, authorizationHeader);

export const addNote = async (data: NotePost): Promise<Response> =>
  await api.post('/notes', data, authorizationHeader);

export const updateNote = async (data: NotePut): Promise<Response> => {
  return await api.put(`/notes/${data.id}`, data, authorizationHeader);
};

export const deleteNote = async (id: number): Promise<Response> =>
  await api.delete(`/notes/${id}`, authorizationHeader);
