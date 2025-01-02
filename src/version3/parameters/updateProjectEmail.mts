import { ProjectEmailAddress } from '../models/index.mjs';

export interface UpdateProjectEmail extends ProjectEmailAddress {
  /** The project ID. */
  projectId: number;
}
