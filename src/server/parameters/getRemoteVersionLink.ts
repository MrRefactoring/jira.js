import { z } from 'zod';

export const GetRemoteVersionLinkSchema = z.object({
  /** ID of the version. */
  versionId: z.string(),
  /**
   * The id of the remote issue link to be returned. If (not provided) all remote links for the issue are returned.
   * Remote version links follow the same general rules that Issue Links do, except that they are permitted to use any
   * arbitrary well-formed JSON data format with no restrictions imposed. It is recommended, but not required, that they
   * follow the same format used for Remote Issue Links, as described at <a
   * href="https://developer.atlassian.com/display/JIRADEV/Fields+in+Remote+Issue+Links">https://developer.atlassian.com/display/JIRADEV/Fields+in+Remote+Issue+Links</a>.
   */
  globalId: z.string(),
});

export type GetRemoteVersionLink = z.input<typeof GetRemoteVersionLinkSchema>;
