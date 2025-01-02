import type { Config } from '@/config.mjs';

export type Callback<T> = (err: Config.Error | null, data?: T) => void;
