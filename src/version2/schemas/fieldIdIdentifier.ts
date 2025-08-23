import { z } from 'zod';

export const FieldIdIdentifierSchema = z.object({});

export type FieldIdIdentifier = z.infer<typeof FieldIdIdentifierSchema>;
