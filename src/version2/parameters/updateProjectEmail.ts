import { ProjectEmailAddress } from '../models';

export interface UpdateProjectEmail extends ProjectEmailAddress {
  /** The project ID. */
  projectId: number;
}
