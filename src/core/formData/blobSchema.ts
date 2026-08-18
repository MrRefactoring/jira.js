import { z } from 'zod';

export const BlobSchema = z.custom<Blob>(val => typeof Blob !== 'undefined' && val instanceof Blob);
