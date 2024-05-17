import { Config } from './config';

export type Callback<T> = (err: Config.Error | null, data?: T) => void;
