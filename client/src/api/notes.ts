import { getToken } from '../services/auth';
import { NotesResponse, NotePost } from '../types';
import api from './api';

const authorizationHeader = {
  headers: { Authorization: 'Bearer ' + getToken() },
};

export const getNotes = async (): Promise<NotesResponse> =>
  await api.get('/notes', authorizationHeader);

export const addNote = async (data: NotePost): Promise<Response> =>
  await api.post('/notes', data, authorizationHeader);

export const deleteNote = async (id: number): Promise<Response> =>
  await api.delete(`/notes/${id}`, authorizationHeader);
