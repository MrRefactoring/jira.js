import type { ProjectCategory } from '../models/index.js';

export interface UpdateProjectCategory extends Omit<ProjectCategory, 'id'> {
  id: number;
}
