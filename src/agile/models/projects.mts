import type { AvatarUrls } from './avatarUrls.mjs';

export interface Projects {
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: AvatarUrls;
  projectCategory: {
    self: string;
    id: string;
    name: string;
    description: string;
  };
  simplified: boolean;
  style: string;
  insight: {
    totalIssueCount: number;
    lastIssueUpdateTime: string;
  };
}
