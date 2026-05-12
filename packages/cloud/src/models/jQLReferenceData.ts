import { z } from 'zod';
import { FieldReferenceDataSchema } from '#/models/fieldReferenceData';
import { FunctionReferenceDataSchema } from '#/models/functionReferenceData';

/** Lists of JQL reference data. */
export const JQLReferenceDataSchema = z.object({
  /** List of JQL query reserved words. */
  jqlReservedWords: z.array(z.string()).optional(),
  /** List of fields usable in JQL queries. */
  visibleFieldNames: z.array(FieldReferenceDataSchema).optional(),
  /** List of functions usable in JQL queries. */
  visibleFunctionNames: z.array(FunctionReferenceDataSchema).optional(),
});

export type JQLReferenceData = z.infer<typeof JQLReferenceDataSchema>;
