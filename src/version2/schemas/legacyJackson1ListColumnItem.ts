import { z } from 'zod';
import { ColumnItemSchema } from './columnItem';

export const LegacyJackson1ListColumnItemSchema = z.array(ColumnItemSchema);

export type LegacyJackson1ListColumnItem = z.infer<typeof LegacyJackson1ListColumnItemSchema>;
