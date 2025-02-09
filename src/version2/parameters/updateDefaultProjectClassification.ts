import { UpdateDefaultProjectClassificationBean } from '../models';

export interface UpdateDefaultProjectClassification extends UpdateDefaultProjectClassificationBean {
  /** The project ID or project key (case-sensitive). */
  projectIdOrKey: string;
}
