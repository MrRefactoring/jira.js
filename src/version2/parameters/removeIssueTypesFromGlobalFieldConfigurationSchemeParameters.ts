import { z } from 'zod';

export const RemoveIssueTypesFromGlobalFieldConfigurationSchemeParametersSchema = z.object({
  /** The ID of the field configuration scheme. */
  id: z.number().int(),
  /**
   * The list of issue type IDs. Must contain unique values not longer than 255 characters and not be empty. Maximum of
   * 100 IDs.
   */
  issueTypeIds: z.array(z.string()),
});

export type RemoveIssueTypesFromGlobalFieldConfigurationSchemeParameters = z.infer<
  typeof RemoveIssueTypesFromGlobalFieldConfigurationSchemeParametersSchema
>;
