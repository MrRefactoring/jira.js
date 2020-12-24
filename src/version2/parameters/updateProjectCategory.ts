import { ProjectCategory } from '../models';

export interface UpdateProjectCategory extends Omit<ProjectCategory, 'id'> {
  id: number;
}
