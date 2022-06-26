import { AxiosResponse } from 'axios';
import { Note, AddNoteData, UpdateNoteData, NotesResponse } from '../types';
import api from './api';

export const getNotes = async (page: number): Promise<NotesResponse> =>
  await api
    .get(`/notes?pagination[page]=${page}&pagination[pageSize]=12&populate=*`)
    .then(res => ({
      notes: res.data.data,
      pageCount: res.data.meta.pagination.pageCount,
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
