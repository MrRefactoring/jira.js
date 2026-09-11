import { z } from 'zod';

export const GetFieldAutoCompleteForQueryStringSchema = z.object({
  /** The portion of the predicate value that has already been provided by the user. */
  predicateValue: z.string().optional(),
  /** The predicate for which the suggestions are generated. Suggestions are generated only for: "by", "from" and "to". */
  predicateName: z.string().optional(),
  /** The field name for which the suggestions are generated. */
  fieldName: z.string().optional(),
  /** The portion of the field value that has already been provided by the user. */
  fieldValue: z.string().optional(),
});

export type GetFieldAutoCompleteForQueryString = z.input<typeof GetFieldAutoCompleteForQueryStringSchema>;
