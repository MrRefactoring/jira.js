import type { StatusCategory } from './statusCategory';

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}
