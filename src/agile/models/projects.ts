export interface Projects {
  self: string,
  id: string,
  key: string,
  name: string,
  avatarUrls: {
    '48x48': string,
    '24x24': string,
    '16x16': string,
    '32x32': string
  },
  projectCategory: {
    self: string,
    id: string,
    name: string,
    description: string
  },
  simplified: boolean,
  style: string,
  insight: {
    totalIssueCount: number,
    lastIssueUpdateTime: string
  }
}
