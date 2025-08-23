import { z } from 'zod';

/** An issue suggested for use in the issue picker auto-completion. */
export const SuggestedIssueSchema = z.object({
  /** The ID of the issue. */
  id: z.number().int().optional(),
  /** The URL of the issue type's avatar. */
  img: z.string().optional(),
  /** The key of the issue. */
  key: z.string().optional(),
  /** The key of the issue in HTML format. */
  keyHtml: z.string().optional(),
  /** The phrase containing the query string in HTML format, with the string highlighted with HTML bold tags. */
  summary: z.string().optional(),
  /** The phrase containing the query string, as plain text. */
  summaryText: z.string().optional(),
});

export type SuggestedIssue = z.infer<typeof SuggestedIssueSchema>;
