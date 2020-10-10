export interface BoardAdminsBean {
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
}
