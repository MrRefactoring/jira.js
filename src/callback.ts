import type { Config } from './config.js';

export type Callback<T> = (err: Config.Error | null, data?: T) => void;
