import { z } from 'zod';
import { apiObject } from '#/core';

export const FormAnswerSchema = apiObject({
  /** Answer in Atlassian Document Format (ADF) */
  adf: z.unknown().optional(),
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
