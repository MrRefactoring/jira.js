import { z } from 'zod';
import { apiObject } from '#/core';
/** Issue Bulk Delete Payload */

export const IssueBulkDeletePayloadSchema = apiObject({
  /**
   * List of issue IDs or keys which are to be bulk deleted. These IDs or keys can be from different projects and issue
   * types.
   */
  selectedIssueIdsOrKeys: z.array(z.string()),
  /**
   * A boolean value that indicates whether to send a bulk change notification when the issues are being deleted.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification: z.boolean().nullish(),
});

export type IssueBulkDeletePayload = z.infer<typeof IssueBulkDeletePayloadSchema>;
