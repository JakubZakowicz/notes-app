import { AxiosError } from 'axios';
import { RouteProps } from 'react-router-dom';

export type LoginInputs = {
  email: string;
  password: string;
}

export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PrivateRouteProps extends RouteProps {}

type Note = {
  id: number;
  attributes: { title: string; text: string };
}

export type NoteFormInputs = {
  title: string,
  text: string
}

export type NotesResponse = {
  data: { data: Note[] };
}

export type NoteResponse = {
  data: { data: Note };
}

export type NotePost = {
  data: {
    title: string;
    text: string;
  };
}

export type NotePut = {
  id: string | undefined
  data: {
    title: string;
    text: string;
  };
}

export type ErrorHandlerProps = {
  error: AxiosError<any>;
}

export type ErrorMessageProps = {
  status?: string;
  name?: string;
  message?: string;
}
