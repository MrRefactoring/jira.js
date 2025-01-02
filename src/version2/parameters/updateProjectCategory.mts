import { ProjectCategory } from '../models/index.mjs';

export interface UpdateProjectCategory extends Omit<ProjectCategory, 'id'> {
  id: number;
}
