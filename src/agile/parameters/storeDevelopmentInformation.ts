export interface StoreDevelopmentInformation {
  /** List of repositories containing development information. Must not contain duplicates. Maximum number of entities across all repositories is 1000. */
  repositories?: {
    /** The name of this repository. Max length is 255 characters. */
    name: string;
    /** Description of this repository. Max length is 1024 characters. */
    description?: string;
    /** The ID of the repository this repository was forked from, if it's a fork. Max length is 255 characters. */
    forkOf?: string;
    /** The URL of this repository. Max length is 1024 characters. */
    url: string;
    /** List of commits to update in this repository. Must not contain duplicate entity IDs. Maximum number of commits is 400 */
    commits?: {
      /** The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024 characters */
      id: string;
      /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. Minimum number of issue keys is 1. Maximum number of issue keys is 100. */
      issueKeys: string[];
      /** An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity and increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId lower than what is currently stored will be ignored. */
      updateSequenceId: number;
      /** The hash of the commit. Max length is 255 characters. */
      hash: string;
      /** The set of flags for this commit */
      flags?: string[];
      /** The commit message. Max length is 1024 characters. */
      message: string;
      /** Describes the author of a particular entity */
      author: {
        /** The name of this user in a format suitable for display. Max length is 255 characters. */
        name: string;
        /** The email address of the user. Used to associate the user with a Jira user. Max length is 255 characters. */
        email?: string;
        /** The username of the user. Used to associate the user with a Jira user if there are multiple users for a given email. Max length is 255 characters. */
        username?: string;
        /** The URL of the profile for this user. Max length is 1024 characters. */
        url?: string;
        /** The URL of the avatar for this user. Max length is 1024 characters. */
        avatar?: string;
      };
      /** The total number of files added, removed, or modified by this commit */
      fileCount: number;
      /** The URL of this commit. Max length is 1024 characters. */
      url: string;
      /** List of file changes. Max number of files is 10. Currently, only the first 5 files are shown (sorted by path) in the UI. This UI behavior may change without notice. */
      files?: {
        /** The path of the file. Max length is 1024 characters. */
        path: string;
        /** The URL of this file. Max length is 1024 characters. */
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
    /** List of branches to update in this repository. Must not contain duplicate entity IDs. Maximum number of branches is 400. */
    branches?: {
      /** The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024 characters. */
      id: string;
      /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. Minimum number of issue keys is 1. Maximum number of issue keys is 100. */
      issueKeys: string[];
      /** An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity and increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId lower than what is currently stored will be ignored. */
      updateSequenceId: number;
      /** The name of the branch. Max length is 255 characters. */
      name: string;
      /** Represents a commit in the version control system. */
      lastCommit: {
        /** The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024 characters */
        id: string;
        /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. Minimum number of issue keys is 1. Maximum number of issue keys is 100. */
        issueKeys: string[];
        /** An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity and increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId lower than what is currently stored will be ignored. */
        updateSequenceId: number;
        /** The hash of the commit. Max length is 255 characters. */
        hash: string;
        /** The set of flags for this commit */
        flags?: string[];
        /** The commit message. Max length is 1024 characters. */
        message: string;
        /** Describes the author of a particular entity */
        author: {
          /** The name of this user in a format suitable for display. Max length is 255 characters. */
          name: string;
          /** The email address of the user. Used to associate the user with a Jira user. Max length is 255 characters. */
          email?: string;
          /** The username of the user. Used to associate the user with a Jira user if there are multiple users for a given email. Max length is 255 characters. */
          username?: string;
          /** The URL of the profile for this user. Max length is 1024 characters. */
          url?: string;
          /** The URL of the avatar for this user. Max length is 1024 characters. */
          avatar?: string;
        };
        /** The total number of files added, removed, or modified by this commit */
        fileCount: number;
        /** The URL of this commit. Max length is 1024 characters. */
        url: string;
        /** List of file changes. Max number of files is 10. Currently, only the first 5 files are shown (sorted by path) in the UI. This UI behavior may change without notice. */
        files?: {
          /** The path of the file. Max length is 1024 characters. */
          path: string;
          /** The URL of this file. Max length is 1024 characters. */
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
      /** The URL of the page for creating a pull request from this branch. Max length is 1024 characters. */
      createPullRequestUrl?: string;
      /** The URL of the branch. Max length is 1024 characters. */
      url: string;
    }[];
    /** List of pull requests to update in this repository. Must not contain duplicate entity IDs. Maximum number of pull requests is 400 */
    pullRequests?: {
      /** The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024 characters */
      id: string;
      /** List of issues keys that this entity is associated with. They must be valid Jira issue keys. Minimum number of issue keys is 1. Maximum number of issue keys is 100. */
      issueKeys: string[];
      /** An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity and increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId lower than what is currently stored will be ignored. */
      updateSequenceId: number;
      /** The status of the pull request. In the case of concurrent updates, priority is given in the order OPEN, MERGED, DECLINED, UNKNOWN */
      status: string;
      /** Title of the pull request. Max length is 1024 characters. */
      title: string;
      /** Describes the author of a particular entity */
      author: {
        /** The name of this user in a format suitable for display. Max length is 255 characters. */
        name: string;
        /** The email address of the user. Used to associate the user with a Jira user. Max length is 255 characters. */
        email?: string;
        /** The username of the user. Used to associate the user with a Jira user if there are multiple users for a given email. Max length is 255 characters. */
        username?: string;
        /** The URL of the profile for this user. Max length is 1024 characters. */
        url?: string;
        /** The URL of the avatar for this user. Max length is 1024 characters. */
        avatar?: string;
      };
      /** The number of comments on the pull request */
      commentCount: number;
      /** The name of the source branch of this PR. Max length is 255 characters. */
      sourceBranch: string;
      /** The url of the source branch of this PR. This is used to match this PR against the branch. Max length is 255 characters. */
      sourceBranchUrl?: string;
      /** The most recent update to this PR. Formatted as a UTC ISO 8601 date time format. */
      lastUpdate: string;
      /** The name of destination branch of this PR. Max length is 255 characters. */
      destinationBranch?: string;
      /** The list of reviewers of this pull request */
      reviewers?: {
        /** The name of this reviewer. Max length is 255 characters. */
        name: string;
        /** The approval status of this reviewer, default is UNAPPROVED. */
        approvalStatus?: string;
        /** The URL of the profile for this reviewer. Max length is 1024 characters. */
        url?: string;
        /** The URL of the avatar for this reviewer. Max length is 1024 characters. */
        avatar?: string;
      }[];
      /** The URL of this pull request. Max length is 1024 characters. */
      url: string;
      /** Shortened identifier for this pull request, used for display. Max length is 255 characters. */
      displayId: string;
    }[];
    /** The URL of the avatar for this repository. Max length is 1024 characters. */
    avatar?: string;
    /** Description of the avatar for this repository. Max length is 1024 characters. */
    avatarDescription?: string;
    /** The ID of this entity. Will be used for cross entity linking. Must be unique by entity type within a repository, i.e., only one commit can have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length is 1024 characters. */
    id: string;
    /** An ID used to apply an ordering to updates for this entity in the case of out-of-order receipt of update requests. This can be any monotonically increasing number. A suggested implementation is to use epoch millis from the provider system, but other alternatives are valid (e.g. a provider could store a counter against each entity and increment that on each update to Jira). Updates for an entity that are received with an updateSqeuenceId lower than what is currently stored will be ignored. */
    updateSequenceId: number;
  }[];
  /** Flag to prevent automatic issue transitions and smart commits being fired, default is false. */
  preventTransitions?: boolean;
  /** Arbitrary properties to tag the submitted repositories with. These properties can be used for delete operations to e.g. clean up all development information associated with an account in the event that the account is removed from the provider system. Note that these properties will never be returned with repository or entity data. They are not intended for use as metadata to associate with a repository. Maximum length of each key or value is 255 characters. Maximum allowed number of properties key/value pairs is 5. Properties keys cannot start with '_' character. Properties keys cannot contain ':' character. */
  properties?: {};
  /** Information about the provider. This is useful for auditing, logging, debugging, and other internal uses. It is not considered private information. Hence, it may not contain personally identifiable information. */
  providerMetadata?: {
    /** An optional name of the source of the development information data. */
    product?: string;
  };
}
