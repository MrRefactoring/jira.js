export interface PageBeanBoardBean {
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: {
    id: number;
    self: string;
    name: string;
    type: string;
    admins: {
      users: {
        key: string;
        self: string;
        name: string;
        displayName: string;
        active: boolean;
        accountId: string;
        avatarUrls: {
          [key: string]: unknown;
        };
      }[];
      groups: {
        name: string;
        self: string;
      }[];
    };
    location: {
      projectId: number;
      userId: number;
      userAccountId: string;
      displayName: string;
      projectName: string;
      projectKey: string;
      projectTypeKey: string;
      avatarURI: string;
      name: string;
    };
    canEdit: boolean;
    isPrivate: boolean;
    favourite: boolean;
  }[];
}
