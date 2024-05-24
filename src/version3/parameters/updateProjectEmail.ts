import type { ProjectEmailAddress } from '../models/index.js';

export interface UpdateProjectEmail extends ProjectEmailAddress {
  /** The project ID. */
  projectId: number;
}
