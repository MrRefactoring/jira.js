import { GroupLabel } from './groupLabel';

export interface FoundGroup {
  name: string;
  html: string;
  labels: GroupLabel[];
  groupId: string;
}
