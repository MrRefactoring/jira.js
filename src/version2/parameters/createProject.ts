import { ProjectInputBean } from '../models';

export interface CreateProject extends ProjectInputBean {
  key: string;
  name: string;
  projectTypeKey: string;
}
