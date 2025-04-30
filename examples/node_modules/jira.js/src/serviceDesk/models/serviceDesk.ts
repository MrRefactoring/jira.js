import type { SelfLink } from './selfLink';

export interface ServiceDesk {
  /** ID of the service desk. */
  id?: string;
  /** ID of the peer project for the service desk. */
  projectId?: string;
  /** Name of the project and service desk. */
  projectName?: string;
  /** Key of the peer project of the service desk. */
  projectKey?: string;
  Links?: SelfLink;
}
