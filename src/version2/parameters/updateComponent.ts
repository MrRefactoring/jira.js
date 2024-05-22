import type { ProjectComponent } from '../models/index.js';

export interface UpdateComponent extends ProjectComponent {
  /** The ID of the component. */
  id: string;
}
