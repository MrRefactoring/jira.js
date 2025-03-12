import type { ProjectComponent } from '../models';

export interface UpdateComponent extends ProjectComponent {
  /** The ID of the component. */
  id: string;
}
