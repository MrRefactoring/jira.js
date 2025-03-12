import type { ProjectEmailAddress } from '../models';

export interface UpdateProjectEmail extends ProjectEmailAddress {
  /** The project ID. */
  projectId: string | number;
}
