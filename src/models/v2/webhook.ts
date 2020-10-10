export interface Webhook {
  id: number;
  jqlFilter: string;
  events?: string[];
  expirationDate: number;
}
