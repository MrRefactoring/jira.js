/** Represents a repository, containing development information such as commits, pull requests, and branches. */
export interface GetRepository {
  /** The name of this repository. Max length is 255 characters. */
  name: string;
  /** Description of this repository. Max length is 1024 characters. */
  description?: string;
  /** The ID of the repository this repository was forked from, if it's a fork. Max length is 1024 characters. */
  forkOf?: string;
  /** The URL of this repository. Max length is 2000 characters. */
  url: string;
  /**
   * List of commits to update in this repository. Must not contain duplicate entity IDs. Maximum number of commits is
   * 400
   */
  commits?: {
    /**
     * The identifier or hash of the commit. Will be used for cross entity linking. Must be unique for all commits
     * within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID
     * 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024
     * characters
     */
    id: string;
    /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. */
    issueKeys: string[];
    /**
     * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update
     * requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis from
     * the provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity
     * and increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId
     * lower than what is currently stored will be ignored.
     */
    updateSequenceId: number;
    /** @deprecated Deprecated. Use the id field instead. */
    hash?: string;
    /** The set of flags for this commit */
    flags?: string[];
    /**
     * The commit message. Max length is 1024 characters. If anything longer is supplied, it will be truncated down to
     * 1024 characters.
     */
    message: string;
    /** Describes the author of a particular entity */
    author: {
      /** @deprecated Deprecated. The name of this user in a format suitable for display. Max length is 255 characters. */
      name?: string;
      /** The email address of the user. Used to associate the user with a Jira user. Max length is 255 characters. */
      email?: string;
      /**
       * @deprecated Deprecated. The username of the user. Used to associate the user with a Jira user if there are
       *   multiple users for a given email. Max length is 255 characters.
       */
      username?: string;
      /** @deprecated Deprecated. The URL of the profile for this user. Max length is 2000 characters. */
      url?: string;
      /** @deprecated Deprecated. The URL of the avatar for this user. Max length is 2000 characters. */
      avatar?: string;
    };
    /** The total number of files added, removed, or modified by this commit */
    fileCount: number;
    /** The URL of this commit. Max length is 2000 characters. */
    url: string;
    /**
     * List of file changes. Max number of files is 10. Currently, only the first 5 files are shown (sorted by path) in
     * the UI. This UI behavior may change without notice.
     */
    files?: {
      /** The path of the file. Max length is 1024 characters. */
      path: string;
      /** The URL of this file. Max length is 2000 characters. */
      url: string;
      /** The operation performed on this file */
      changeType: string;
      /** Number of lines added to the file */
      linesAdded: number;
      /** Number of lines removed from the file */
      linesRemoved: number;
    }[];
    /** The author timestamp of this commit. Formatted as a UTC ISO 8601 date time format. */
    authorTimestamp: string;
    /** Shortened identifier for this commit, used for display. Max length is 255 characters. */
    displayId: string;
  }[];
  /**
   * List of branches to update in this repository. Must not contain duplicate entity IDs. Maximum number of branches is
   * 400.
   */
  branches?: {
    /**
     * The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a repository,
     * i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y'
     * is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024 characters.
     */
    id: string;
    /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. */
    issueKeys: string[];
    /**
     * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update
     * requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis from
     * the provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity
     * and increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId
     * lower than what is currently stored will be ignored.
     */
    updateSequenceId: number;
    /** The name of the branch. Max length is 512 characters. */
    name: string;
    /** Represents a commit in the version control system. */
    lastCommit: {
      /**
       * The identifier or hash of the commit. Will be used for cross entity linking. Must be unique for all commits
       * within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with
       * ID 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is
       * 1024 characters
       */
      id: string;
      /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. */
      issueKeys: string[];
      /**
       * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update
       * requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis
       * from the provider system, but other alternatives are valid (e.g. a provider could store a counter against each
       * entity and increment that on each update to Jira). Updates for an entity that are received with an
       * updateSqeuenceId lower than what is currently stored will be ignored.
       */
      updateSequenceId: number;
      /** @deprecated Deprecated. Use the id field instead. */
      hash?: string;
      /** The set of flags for this commit */
      flags?: string[];
      /**
       * The commit message. Max length is 1024 characters. If anything longer is supplied, it will be truncated down to
       * 1024 characters.
       */
      message: string;
      /** Describes the author of a particular entity */
      author: {
        /** @deprecated Deprecated. The name of this user in a format suitable for display. Max length is 255 characters. */
        name?: string;
        /** The email address of the user. Used to associate the user with a Jira user. Max length is 255 characters. */
        email?: string;
        /**
         * @deprecated Deprecated. The username of the user. Used to associate the user with a Jira user if there are
         *   multiple users for a given email. Max length is 255 characters.
         */
        username?: string;
        /** @deprecated Deprecated. The URL of the profile for this user. Max length is 2000 characters. */
        url?: string;
        /** @deprecated Deprecated. The URL of the avatar for this user. Max length is 2000 characters. */
        avatar?: string;
      };
      /** The total number of files added, removed, or modified by this commit */
      fileCount: number;
      /** The URL of this commit. Max length is 2000 characters. */
      url: string;
      /**
       * List of file changes. Max number of files is 10. Currently, only the first 5 files are shown (sorted by path)
       * in the UI. This UI behavior may change without notice.
       */
      files?: {
        /** The path of the file. Max length is 1024 characters. */
        path: string;
        /** The URL of this file. Max length is 2000 characters. */
        url: string;
        /** The operation performed on this file */
        changeType: string;
        /** Number of lines added to the file */
        linesAdded: number;
        /** Number of lines removed from the file */
        linesRemoved: number;
      }[];
      /** The author timestamp of this commit. Formatted as a UTC ISO 8601 date time format. */
      authorTimestamp: string;
      /** Shortened identifier for this commit, used for display. Max length is 255 characters. */
      displayId: string;
    };
    /** The URL of the page for creating a pull request from this branch. Max length is 2000 characters. */
    createPullRequestUrl?: string;
    /** The URL of the branch. Max length is 2000 characters. */
    url: string;
  }[];
  /**
   * List of pull requests to update in this repository. Must not contain duplicate entity IDs. Maximum number of pull
   * requests is 400
   */
  pullRequests?: {
    /**
     * The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a repository,
     * i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y'
     * is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024 characters
     */
    id: string;
    /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. */
    issueKeys: string[];
    /**
     * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update
     * requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis from
     * the provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity
     * and increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId
     * lower than what is currently stored will be ignored.
     */
    updateSequenceId: number;
    /**
     * The status of the pull request. In the case of concurrent updates, priority is given in the order OPEN, MERGED,
     * DECLINED, UNKNOWN
     */
    status: string;
    /** Title of the pull request. Max length is 1024 characters. */
    title: string;
    /** Describes the author of a particular entity */
    author: {
      /** @deprecated Deprecated. The name of this user in a format suitable for display. Max length is 255 characters. */
      name?: string;
      /** The email address of the user. Used to associate the user with a Jira user. Max length is 255 characters. */
      email?: string;
      /**
       * @deprecated Deprecated. The username of the user. Used to associate the user with a Jira user if there are
       *   multiple users for a given email. Max length is 255 characters.
       */
      username?: string;
      /** @deprecated Deprecated. The URL of the profile for this user. Max length is 2000 characters. */
      url?: string;
      /** @deprecated Deprecated. The URL of the avatar for this user. Max length is 2000 characters. */
      avatar?: string;
    };
    /** The number of comments on the pull request */
    commentCount: number;
    /** The name of the source branch of this PR. Max length is 255 characters. */
    sourceBranch: string;
    /**
     * The url of the source branch of this PR. This is used to match this PR against the branch. Max length is 2000
     * characters.
     */
    sourceBranchUrl?: string;
    /** The most recent update to this PR. Formatted as a UTC ISO 8601 date time format. */
    lastUpdate: string;
    /** The name of destination branch of this PR. Max length is 255 characters. */
    destinationBranch?: string;
    /** The url of the destination branch of this PR. Max length is 2000 characters. */
    destinationBranchUrl?: string;
    /** The list of reviewers of this pull request */
    reviewers?: {
      /** @deprecated Deprecated. The name of this reviewer. Max length is 255 characters. */
      name?: string;
      /** The approval status of this reviewer, default is UNAPPROVED. */
      approvalStatus?: string;
      /** @deprecated Deprecated. The URL of the profile for this reviewer. Max length is 2000 characters. */
      url?: string;
      /** @deprecated Deprecated. The URL of the avatar for this reviewer. Max length is 2000 characters. */
      avatar?: string;
      /** The email address of this reviewer. Max length is 254 characters. */
      email?: string;
      /** The Atlassian Account ID (AAID) of this reviewer. Max length is 128 characters. */
      accountId?: string;
    }[];
    /** The URL of this pull request. Max length is 2000 characters. */
    url: string;
    /** Shortened identifier for this pull request, used for display. Max length is 255 characters. */
    displayId: string;
  }[];
  /** The URL of the avatar for this repository. Max length is 2000 characters. */
  avatar?: string;
  /** Description of the avatar for this repository. Max length is 1024 characters. */
  avatarDescription?: string;
  /**
   * The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a repository,
   * i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y'
   * is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024 characters.
   */
  id: string;
  /**
   * An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update requests.
   * This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the
   * provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity and
   * increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId lower than
   * what is currently stored will be ignored.
   */
  updateSequenceId: number;
}
