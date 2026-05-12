import { z } from 'zod';

export const SubmitComponentsSchema = z.object({
  /**
   * Properties assigned to incidents/components/review data that can then be used for delete / query operations.
   *
   * Examples might be an account or user ID that can then be used to clean up data if an account is removed from the
   * Provider system.
   *
   * Properties are supplied as key/value pairs, and a maximum of 5 properties can be supplied, keys cannot contain ':'
   * or start with '_'.
   */
  properties: z.record(z.string(), z.any()).optional(),
  devopsComponents: z.array(
    z.object({
      /**
       * The DevOpsComponentData schema version used for this devops component data.
       *
       * Placeholder to support potential schema changes in the future.
       */
      schemaVersion: z.enum(['1.0']),
      /** The identifier for the DevOps Component. Must be unique for a given Provider. */
      id: z.string().max(255, 'id must be at most 255 characters'),
      /**
       * An ID used to apply an ordering to updates for this DevOps Component in the case of out-of-order receipt of
       * update requests.
       *
       * This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the
       * Provider system, but other alternatives are valid (e.g. a Provider could store a counter against each DevOps
       * Component and increment that on each update to Jira).
       *
       * Updates for a DevOps Component that are received with an updateSqeuenceId lower than what is currently stored
       * will be ignored.
       */
      updateSequenceNumber: z.number(),
      /** The human-readable name for the DevOps Component. Will be shown in the UI. */
      name: z.string().max(255, 'name must be at most 255 characters'),
      /** The human-readable name for the Provider that owns this DevOps Component. Will be shown in the UI. */
      providerName: z.string().max(255, 'providerName must be at most 255 characters').optional(),
      /** A description of the DevOps Component in Markdown format. Will be shown in the UI. */
      description: z.string().max(5000, 'description must be at most 5000 characters'),
      /**
       * A URL users can use to link to a summary view of this devops component, if appropriate.
       *
       * This could be any location that makes sense in the Provider system (e.g. if the summary information comes from
       * a specific project, it might make sense to link the user to the component in that project).
       */
      url: z.url().max(2000, 'url must be at most 2000 characters'),
      /** A URL to display a logo representing this devops component, if available. */
      avatarUrl: z.url().max(2000, 'avatarUrl must be at most 2000 characters'),
      /** The tier of the component. Will be shown in the UI. */
      tier: z.enum(['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4']),
      /** The type of the component. Will be shown in the UI. */
      componentType: z.enum([
        'Service',
        'Application',
        'Library',
        'Capability',
        'Cloud resource',
        'Data pipeline',
        'Machine learning model',
        'UI element',
        'Website',
        'Other',
      ]),
      /**
       * The last-updated timestamp to present to the user the last time the DevOps Component was updated.
       *
       * Expected format is an RFC3339 formatted string.
       */
      lastUpdated: z.string().transform(s => new Date(s)),
    }),
  ),
  /**
   * Information about the provider. This is useful for auditing, logging, debugging, and other internal uses. It is not
   * considered private information. Hence, it may not contain personally identifiable information.
   */
  providerMetadata: z
    .object({
      /** An optional name of the source of the incidents. */
      product: z.string().optional(),
    })
    .optional(),
});

export type SubmitComponents = z.input<typeof SubmitComponentsSchema>;
