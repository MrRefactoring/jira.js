import { AxiosError } from 'axios';

export type Callback<T> = (err: AxiosError | null, data?: T) => void;
