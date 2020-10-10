export interface StatusJsonBean {
  self: string;
  statusColor: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: {
    [key: string]: unknown;
  };
}
