import { z } from 'zod';

/** Data related to a single Remote Link.* */
export const GetRemoteLinkByIdSchema = z.object({
  /**
   * The schema version used for this data.
   *
   * Placeholder to support potential schema changes in the future.
   */
  schemaVersion: z.enum(['1.0']).optional(),
  /** The identifier for the Remote Link. Must be unique for a given Provider. */
  id: z.string().max(255, 'id must be at most 255 characters'),
  /**
   * An ID used to apply an ordering to updates for this Remote Link in the case of out-of-order receipt of update
   * requests.
   *
   * It must be a monotonically increasing number. For example, epoch time could be one way to generate the
   * `updateSequenceNumber`.
   *
   * Updates for a Remote Link that is received with an `updateSqeuenceNumber` less than or equal to what is currently
   * stored will be ignored.
   */
  updateSequenceNumber: z.number(),
  /**
   * The human-readable name for the Remote Link.
   *
   * Will be shown in the UI.
   */
  displayName: z.string().max(255, 'displayName must be at most 255 characters'),
  /** The URL to this Remote Link in your system. */
  url: z.url().max(2000, 'url must be at most 2000 characters'),
  /**
   * The type of the Remote Link. The current supported types are 'document', 'alert', 'test', 'security', 'logFile',
   * 'prototype', 'coverage', 'bugReport' and 'other'
   */
  type: z.enum(['document', 'alert', 'test', 'security', 'logFile', 'prototype', 'coverage', 'bugReport', 'other']),
  /**
   * An optional description to attach to this Remote Link.
   *
   * This may be anything that makes sense in your system.
   */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** The last-updated timestamp to present to the user as a summary of when Remote Link was last updated. */
  lastUpdated: z.string().transform(s => new Date(s)),
  /** The entities to associate the Remote Link information with. */
  associations: z.array(z.unknown()).optional(),
  /** The status of a Remote Link. */
  status: z
    .object({
      /**
       * Appearance is a fixed set of appearance types affecting the colour of the status lozenge in the UI. The colours
       * they correspond to are equivalent to atlaskit's [Lozenge](https://atlaskit.atlassian.com/packages/core/lozenge)
       * component.
       */
      appearance: z.enum(['default', 'inprogress', 'moved', 'new', 'removed', 'prototype', 'success']),
      /**
       * The human-readable description for the Remote Link status.
       *
       * Will be shown in the UI.
       */
      label: z.string().max(255, 'label must be at most 255 characters'),
    })
    .optional(),
  /**
   * Optional list of actionIds. They are associated with the actions the provider is able to provide when they
   * registered. Indicates which actions this Remote Link has.
   *
   * If any actions have a templateUrl that requires string substitution, then `attributeMap` must be passed in.
   */
  actionIds: z.array(z.string()).optional(),
  /**
   * Map of key/values (string to string mapping). This is used to build the urls for actions from the templateUrl the
   * provider registered their available actions with.
   */
  attributeMap: z.record(z.string(), z.any()).optional(),
});

export type GetRemoteLinkById = z.infer<typeof GetRemoteLinkByIdSchema>;
