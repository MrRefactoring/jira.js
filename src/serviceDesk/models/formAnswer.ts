import { z } from 'zod';
import { apiObject } from '#/core';
import { JsonNodeSchema } from './jsonNode';

export const FormAnswerSchema = apiObject({
  adf: JsonNodeSchema.optional(),
  /** IDs of selected choices */
  choices: z.array(z.string()).optional(),
  /** Answer in date format (yyyy-MM-dd) */
  date: z.string().optional(),
  /**
   * The IDs of files to be attached to the form that are obtained by calling the ‘attach temporary file’ endpoint on
   * the corresponding service desk.
   */
  files: z.array(z.string()).optional(),
  /** Answer in free text format */
  text: z.string().optional(),
  /** Answer in timestamp format (HH:mm) */
  time: z.string().optional(),
  /** IDs of selected users */
  users: z.array(z.string()).optional(),
});

export type FormAnswer = z.infer<typeof FormAnswerSchema>;
