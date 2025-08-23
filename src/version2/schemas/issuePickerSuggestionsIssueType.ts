import { z } from 'zod';
import { SuggestedIssueSchema } from './suggestedIssue';

/** A type of issue suggested for use in auto-completion. */
export const IssuePickerSuggestionsIssueTypeSchema = z.object({
  /** The ID of the type of issues suggested for use in auto-completion. */
  id: z.string().optional(),
  /** A list of issues suggested for use in auto-completion. */
  issues: z.array(SuggestedIssueSchema).optional(),
  /** The label of the type of issues suggested for use in auto-completion. */
  label: z.string().optional(),
  /** If no issue suggestions are found, returns a message indicating no suggestions were found, */
  msg: z.string().optional(),
  /** If issue suggestions are found, returns a message indicating the number of issues suggestions found and returned. */
  sub: z.string().optional(),
});

export type IssuePickerSuggestionsIssueType = z.infer<typeof IssuePickerSuggestionsIssueTypeSchema>;
