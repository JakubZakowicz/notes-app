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

export type NoteFormInputs = {
  title: string,
  text: string
}

export interface PrivateRouteProps extends RouteProps {}

export type Note = {
  id: number;
  attributes: { title: string; text: string };
}

export type AddNoteData = {
  data: {
    title: string;
    text: string;
  };
}

export type UpdateNoteData = AddNoteData & {
  id: number
}

export type ErrorHandlerProps = {
  error: AxiosError<any>;
}

export type ErrorMessageProps = {
  status?: string;
  name?: string;
  message?: string;
}
