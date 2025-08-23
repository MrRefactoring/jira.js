import { z } from 'zod';

export const UpdateIssueLinkTypeParametersSchema = z.object({
  /** The ID of the issue link type. */
  issueLinkTypeId: z.string(),
  /**
   * The ID of the issue link type and is used as follows:
   *
   * - In the [ issueLink](#api-rest-api-2-issueLink-post) resource it is the type of issue link. Required on create when
   *   `name` isn't provided. Otherwise, read only.
   * - In the [ issueLinkType](#api-rest-api-2-issueLinkType-post) resource it is read only.
   */
  id: z.string().optional(),
  /**
   * The description of the issue link type inward link and is used as follows:
   *
   * - In the [ issueLink](#api-rest-api-2-issueLink-post) resource it is read only.
   * - In the [ issueLinkType](#api-rest-api-2-issueLinkType-post) resource it is required on create and optional on
   *   update. Otherwise, read only.
   */
  inward: z.string().optional(),
  /**
   * The name of the issue link type and is used as follows:
   *
   * - In the [ issueLink](#api-rest-api-2-issueLink-post) resource it is the type of issue link. Required on create when
   *   `id` isn't provided. Otherwise, read only.
   * - In the [ issueLinkType](#api-rest-api-2-issueLinkType-post) resource it is required on create and optional on
   *   update. Otherwise, read only.
   */
  name: z.string().optional(),
  /**
   * The description of the issue link type outward link and is used as follows:
   *
   * - In the [ issueLink](#api-rest-api-2-issueLink-post) resource it is read only.
   * - In the [ issueLinkType](#api-rest-api-2-issueLinkType-post) resource it is required on create and optional on
   *   update. Otherwise, read only.
   */
  outward: z.string().optional(),
  /** The URL of the issue link type. Read only. */
  self: z.string().optional(),
});

export type UpdateIssueLinkTypeParameters = z.infer<typeof UpdateIssueLinkTypeParametersSchema>;
