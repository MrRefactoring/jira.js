import type { JiraError } from './config';

export type Callback<T> = (err: JiraError | null, data?: T) => void;
