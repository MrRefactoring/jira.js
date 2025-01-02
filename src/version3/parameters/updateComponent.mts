import { ProjectComponent } from '../models/index.mjs';

export interface UpdateComponent extends ProjectComponent {
  /** The ID of the component. */
  id: string;
}
