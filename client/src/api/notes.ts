import { AxiosResponse } from 'axios';
import { Note, AddNoteData, UpdateNoteData, NotesResponse } from '../types';
import api from './api';

export const getNotes = async (): Promise<NotesResponse> =>
  await api
    .get(`/notes?populate=*`)
    .then(res => ({
      notes: res.data.data,
    }));

export const getNote = async (id: number): Promise<Note> =>
  await api.get(`/notes/${id}`).then(res => res.data.data);

export const addNote = async (data: AddNoteData): Promise<AxiosResponse> =>
  await api.post('/notes', data);

export const updateNote = async (
  data: UpdateNoteData
): Promise<AxiosResponse> => {
  return await api.put(`/notes/${data.id}`, data);
};

export const deleteNote = async (id: number): Promise<AxiosResponse> =>
  await api.delete(`/notes/${id}`);
