import { z } from 'zod';

export const GetIssueDevelopmentStatusDetailSchema = z.object({
  /** The numeric issue ID as a string, for example "10001". Issue keys are not accepted. */
  issueId: z.string(),
  /** The integration identifier, for example stash, bitbucket, github or githube. Other identifiers are accepted. */
  applicationType: z.string(),
  /** The development data type, for example pullrequest, repository or branch. Other types are accepted. */
  dataType: z.string(),
});

export type GetIssueDevelopmentStatusDetail = z.input<typeof GetIssueDevelopmentStatusDetailSchema>;
