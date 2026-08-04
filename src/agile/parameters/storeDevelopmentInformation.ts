import { z } from 'zod';
import { IssueIdOrKeysAssociationSchema } from '../models';

export const StoreDevelopmentInformationSchema = z.object({
  /**
   * List of repositories containing development information. Must not contain duplicates. Maximum number of entities
   * across all repositories is 1000.
   */
  repositories: z.array(
    z.object({
      /** The name of this repository. Max length is 255 characters. */
      name: z.string().max(255, 'name must be at most 255 characters'),
      /** Description of this repository. Max length is 1024 characters. */
      description: z.string().max(1024, 'description must be at most 1024 characters').optional(),
      /** The ID of the repository this repository was forked from, if it's a fork. Max length is 1024 characters. */
      forkOf: z.string().max(1024, 'forkOf must be at most 1024 characters').optional(),
      /** The URL of this repository. Max length is 2000 characters. */
      url: z.string().max(2000, 'url must be at most 2000 characters'),
      /**
       * List of commits to update in this repository. Must not contain duplicate entity IDs. Maximum number of commits
       * is 400
       */
      commits: z
        .array(
          z.object({
            /**
             * The identifier or hash of the commit. Will be used for cross entity linking. Must be unique for all
             * commits within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a
             * branch with ID 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are
             * allowed. Max length is 1024 characters
             */
            id: z.string(),
            /** The Jira issue keys or IDs to associate the commit with. */
            associations: z.array(IssueIdOrKeysAssociationSchema).optional(),
            /**
             * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update
             * requests. This can be any monotonically increasing number. A suggested implementation is to use epoch
             * millis from the provider system, but other alternatives are valid (e.g. a provider could store a counter
             * against each entity and increment that on each update to Jira). Updates for an entity that are received
             * with an updateSqeuenceId lower than what is currently stored will be ignored.
             */
            updateSequenceId: z.number(),
            /** The set of flags for this commit */
            flags: z.array(z.enum(['MERGE_COMMIT'])).optional(),
            /**
             * The commit message. Max length is 1024 characters. If anything longer is supplied, it will be truncated
             * down to 1024 characters.
             */
            message: z.string().max(1024, 'message must be at most 1024 characters'),
            /** Describes the author of a particular entity */
            author: z.object({
              /** Deprecated. The name of this user in a format suitable for display. Max length is 255 characters. */
              name: z.string().max(255, 'name must be at most 255 characters').optional(),
              /**
               * The email address of the user. Used to associate the user with a Jira user. Max length is 255
               * characters.
               */
              email: z.string().max(255, 'email must be at most 255 characters').optional(),
              /**
               * Deprecated. The username of the user. Used to associate the user with a Jira user if there are multiple
               * users for a given email. Max length is 255 characters.
               */
              username: z.string().max(255, 'username must be at most 255 characters').optional(),
              /** Deprecated. The URL of the profile for this user. Max length is 2000 characters. */
              url: z.string().max(2000, 'url must be at most 2000 characters').optional(),
              /** Deprecated. The URL of the avatar for this user. Max length is 2000 characters. */
              avatar: z.string().max(2000, 'avatar must be at most 2000 characters').optional(),
            }),
            /** The total number of files added, removed, or modified by this commit */
            fileCount: z.number(),
            /** The URL of this commit. Max length is 2000 characters. */
            url: z.string().max(2000, 'url must be at most 2000 characters'),
            /**
             * List of file changes. Max number of files is 10. Currently, only the first 5 files are shown (sorted by
             * path) in the UI. This UI behavior may change without notice.
             */
            files: z
              .array(
                z.object({
                  /** The path of the file. Max length is 1024 characters. */
                  path: z.string().max(1024, 'path must be at most 1024 characters'),
                  /** The URL of this file. Max length is 2000 characters. */
                  url: z.string().max(2000, 'url must be at most 2000 characters'),
                  /** The operation performed on this file */
                  changeType: z.enum(['ADDED', 'COPIED', 'DELETED', 'MODIFIED', 'MOVED', 'UNKNOWN']),
                  /** Number of lines added to the file */
                  linesAdded: z.number(),
                  /** Number of lines removed from the file */
                  linesRemoved: z.number(),
                }),
              )
              .optional(),
            /** The author timestamp of this commit. Formatted as a UTC ISO 8601 date time format. */
            authorTimestamp: z.string(),
            /** Shortened identifier for this commit, used for display. Max length is 255 characters. */
            displayId: z.string().max(255, 'displayId must be at most 255 characters'),
          }),
        )
        .optional(),
      /**
       * List of branches to update in this repository. Must not contain duplicate entity IDs. Maximum number of
       * branches is 400.
       */
      branches: z
        .array(
          z.object({
            /**
             * The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a
             * repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID
             * 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is
             * 1024 characters.
             */
            id: z.string().max(1024, 'id must be at most 1024 characters'),
            /** The Jira issue keys or IDs to associate the branch with. */
            associations: z.array(IssueIdOrKeysAssociationSchema).optional(),
            /**
             * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update
             * requests. This can be any monotonically increasing number. A suggested implementation is to use epoch
             * millis from the provider system, but other alternatives are valid (e.g. a provider could store a counter
             * against each entity and increment that on each update to Jira). Updates for an entity that are received
             * with an updateSqeuenceId lower than what is currently stored will be ignored.
             */
            updateSequenceId: z.number(),
            /** The name of the branch. Max length is 512 characters. */
            name: z.string().max(512, 'name must be at most 512 characters'),
            /** Represents a commit in the version control system. */
            lastCommit: z.object({
              /**
               * The identifier or hash of the commit. Will be used for cross entity linking. Must be unique for all
               * commits within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g.,
               * a branch with ID 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are
               * allowed. Max length is 1024 characters
               */
              id: z.string(),
              /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. */
              issueKeys: z.array(z.string()),
              /**
               * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of
               * update requests. This can be any monotonically increasing number. A suggested implementation is to use
               * epoch millis from the provider system, but other alternatives are valid (e.g. a provider could store a
               * counter against each entity and increment that on each update to Jira). Updates for an entity that are
               * received with an updateSqeuenceId lower than what is currently stored will be ignored.
               */
              updateSequenceId: z.number(),
              /** The set of flags for this commit */
              flags: z.array(z.enum(['MERGE_COMMIT'])).optional(),
              /**
               * The commit message. Max length is 1024 characters. If anything longer is supplied, it will be truncated
               * down to 1024 characters.
               */
              message: z.string().max(1024, 'message must be at most 1024 characters'),
              /** Describes the author of a particular entity */
              author: z.object({
                /** Deprecated. The name of this user in a format suitable for display. Max length is 255 characters. */
                name: z.string().max(255, 'name must be at most 255 characters').optional(),
                /**
                 * The email address of the user. Used to associate the user with a Jira user. Max length is 255
                 * characters.
                 */
                email: z.string().max(255, 'email must be at most 255 characters').optional(),
                /**
                 * Deprecated. The username of the user. Used to associate the user with a Jira user if there are
                 * multiple users for a given email. Max length is 255 characters.
                 */
                username: z.string().max(255, 'username must be at most 255 characters').optional(),
                /** Deprecated. The URL of the profile for this user. Max length is 2000 characters. */
                url: z.string().max(2000, 'url must be at most 2000 characters').optional(),
                /** Deprecated. The URL of the avatar for this user. Max length is 2000 characters. */
                avatar: z.string().max(2000, 'avatar must be at most 2000 characters').optional(),
              }),
              /** The total number of files added, removed, or modified by this commit */
              fileCount: z.number(),
              /** The URL of this commit. Max length is 2000 characters. */
              url: z.string().max(2000, 'url must be at most 2000 characters'),
              /**
               * List of file changes. Max number of files is 10. Currently, only the first 5 files are shown (sorted by
               * path) in the UI. This UI behavior may change without notice.
               */
              files: z
                .array(
                  z.object({
                    /** The path of the file. Max length is 1024 characters. */
                    path: z.string().max(1024, 'path must be at most 1024 characters'),
                    /** The URL of this file. Max length is 2000 characters. */
                    url: z.string().max(2000, 'url must be at most 2000 characters'),
                    /** The operation performed on this file */
                    changeType: z.enum(['ADDED', 'COPIED', 'DELETED', 'MODIFIED', 'MOVED', 'UNKNOWN']),
                    /** Number of lines added to the file */
                    linesAdded: z.number(),
                    /** Number of lines removed from the file */
                    linesRemoved: z.number(),
                  }),
                )
                .optional(),
              /** The author timestamp of this commit. Formatted as a UTC ISO 8601 date time format. */
              authorTimestamp: z.string(),
              /** Shortened identifier for this commit, used for display. Max length is 255 characters. */
              displayId: z.string().max(255, 'displayId must be at most 255 characters'),
            }),
            /** The URL of the page for creating a pull request from this branch. Max length is 2000 characters. */
            createPullRequestUrl: z
              .string()
              .max(2000, 'createPullRequestUrl must be at most 2000 characters')
              .optional(),
            /** The URL of the branch. Max length is 2000 characters. */
            url: z.string().max(2000, 'url must be at most 2000 characters'),
          }),
        )
        .optional(),
      /**
       * List of pull requests to update in this repository. Must not contain duplicate entity IDs. Maximum number of
       * pull requests is 400
       */
      pullRequests: z
        .array(
          z.object({
            /**
             * The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a
             * repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID
             * 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is
             * 1024 characters
             */
            id: z.string(),
            /** The Jira issue keys or IDs to associate the pull request with. */
            associations: z.array(IssueIdOrKeysAssociationSchema).optional(),
            /**
             * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update
             * requests. This can be any monotonically increasing number. A suggested implementation is to use epoch
             * millis from the provider system, but other alternatives are valid (e.g. a provider could store a counter
             * against each entity and increment that on each update to Jira). Updates for an entity that are received
             * with an updateSqeuenceId lower than what is currently stored will be ignored.
             */
            updateSequenceId: z.number(),
            /**
             * The status of the pull request. In the case of concurrent updates, priority is given in the order OPEN,
             * MERGED, DECLINED, UNKNOWN
             */
            status: z.enum(['OPEN', 'MERGED', 'DECLINED', 'UNKNOWN']),
            /** Title of the pull request. Max length is 1024 characters. */
            title: z.string().max(1024, 'title must be at most 1024 characters'),
            /** Describes the author of a particular entity */
            author: z.object({
              /** Deprecated. The name of this user in a format suitable for display. Max length is 255 characters. */
              name: z.string().max(255, 'name must be at most 255 characters').optional(),
              /**
               * The email address of the user. Used to associate the user with a Jira user. Max length is 255
               * characters.
               */
              email: z.string().max(255, 'email must be at most 255 characters').optional(),
              /**
               * Deprecated. The username of the user. Used to associate the user with a Jira user if there are multiple
               * users for a given email. Max length is 255 characters.
               */
              username: z.string().max(255, 'username must be at most 255 characters').optional(),
              /** Deprecated. The URL of the profile for this user. Max length is 2000 characters. */
              url: z.string().max(2000, 'url must be at most 2000 characters').optional(),
              /** Deprecated. The URL of the avatar for this user. Max length is 2000 characters. */
              avatar: z.string().max(2000, 'avatar must be at most 2000 characters').optional(),
            }),
            /** The number of comments on the pull request */
            commentCount: z.number(),
            /** The name of the source branch of this PR. Max length is 255 characters. */
            sourceBranch: z.string().max(255, 'sourceBranch must be at most 255 characters'),
            /**
             * The url of the source branch of this PR. This is used to match this PR against the branch. Max length is
             * 2000 characters.
             */
            sourceBranchUrl: z.string().max(2000, 'sourceBranchUrl must be at most 2000 characters').optional(),
            /** The most recent update to this PR. Formatted as a UTC ISO 8601 date time format. */
            lastUpdate: z.string(),
            /** The name of destination branch of this PR. Max length is 255 characters. */
            destinationBranch: z.string().max(255, 'destinationBranch must be at most 255 characters').optional(),
            /** The url of the destination branch of this PR. Max length is 2000 characters. */
            destinationBranchUrl: z
              .string()
              .max(2000, 'destinationBranchUrl must be at most 2000 characters')
              .optional(),
            /** The list of reviewers of this pull request */
            reviewers: z
              .array(
                z.object({
                  /** Deprecated. The name of this reviewer. Max length is 255 characters. */
                  name: z.string().max(255, 'name must be at most 255 characters').optional(),
                  /** The approval status of this reviewer, default is UNAPPROVED. */
                  approvalStatus: z.enum(['APPROVED', 'UNAPPROVED']).optional(),
                  /** Deprecated. The URL of the profile for this reviewer. Max length is 2000 characters. */
                  url: z.string().max(2000, 'url must be at most 2000 characters').optional(),
                  /** Deprecated. The URL of the avatar for this reviewer. Max length is 2000 characters. */
                  avatar: z.string().max(2000, 'avatar must be at most 2000 characters').optional(),
                  /** The email address of this reviewer. Max length is 254 characters. */
                  email: z.string().max(254, 'email must be at most 254 characters').optional(),
                  /** The Atlassian Account ID (AAID) of this reviewer. Max length is 128 characters. */
                  accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
                }),
              )
              .optional(),
            /** The URL of this pull request. Max length is 2000 characters. */
            url: z.string().max(2000, 'url must be at most 2000 characters'),
            /** Shortened identifier for this pull request, used for display. Max length is 255 characters. */
            displayId: z.string().max(255, 'displayId must be at most 255 characters'),
          }),
        )
        .optional(),
      /** The URL of the avatar for this repository. Max length is 2000 characters. */
      avatar: z.string().max(2000, 'avatar must be at most 2000 characters').optional(),
      /** Description of the avatar for this repository. Max length is 1024 characters. */
      avatarDescription: z.string().max(1024, 'avatarDescription must be at most 1024 characters').optional(),
      /**
       * The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a
       * repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to
       * repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024
       * characters.
       */
      id: z.string().max(1024, 'id must be at most 1024 characters'),
      /**
       * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update
       * requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis
       * from the provider system, but other alternatives are valid (e.g. a provider could store a counter against each
       * entity and increment that on each update to Jira). Updates for an entity that are received with an
       * updateSqeuenceId lower than what is currently stored will be ignored.
       */
      updateSequenceId: z.number(),
    }),
  ),
  /** Flag to prevent automatic issue transitions and smart commits being fired, default is false. */
  preventTransitions: z.boolean().optional(),
  /**
   * Indicates the operation being performed by the provider system when sending this data. "NORMAL" - Data received
   * during normal operation (e.g. a user pushing a branch). "BACKFILL" - Data received while backfilling existing data
   * (e.g. indexing a newly connected account). Default is "NORMAL". Please note that "BACKFILL" operations have a much
   * higher rate-limiting threshold but are also processed slower in comparison to "NORMAL" operations.
   */
  operationType: z.enum(['NORMAL', 'BACKFILL']).optional(),
  /**
   * Arbitrary properties to tag the submitted repositories with. These properties can be used for delete operations to
   * e.g. clean up all development information associated with an account in the event that the account is removed from
   * the provider system. Note that these properties will never be returned with repository or entity data. They are not
   * intended for use as metadata to associate with a repository. Maximum length of each key or value is 255 characters.
   * Maximum allowed number of properties key/value pairs is 5. Properties keys cannot start with '_' character.
   * Properties keys cannot contain ':' character.
   */
  properties: z.record(z.string(), z.any()).optional(),
  /**
   * Information about the provider. This is useful for auditing, logging, debugging, and other internal uses. It is not
   * considered private information. Hence, it may not contain personally identifiable information.
   */
  providerMetadata: z
    .object({
      /** An optional name of the source of the development information data. */
      product: z.string().optional(),
    })
    .optional(),
});

export type StoreDevelopmentInformation = z.input<typeof StoreDevelopmentInformationSchema>;
