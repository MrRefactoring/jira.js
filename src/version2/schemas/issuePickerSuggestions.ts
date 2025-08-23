import { z } from 'zod';
import { IssuePickerSuggestionsIssueTypeSchema } from './issuePickerSuggestionsIssueType';

/** A list of issues suggested for use in auto-completion. */
export const IssuePickerSuggestionsSchema = z.object({
  /** A list of issues for an issue type suggested for use in auto-completion. */
  sections: z.array(IssuePickerSuggestionsIssueTypeSchema).optional(),
});

export type IssuePickerSuggestions = z.infer<typeof IssuePickerSuggestionsSchema>;
