import { GlobalScopeBean } from './globalScopeBean';
import { ProjectScopeBean } from './projectScopeBean';

export interface IssueFieldOptionScopeBean {
  projects: number[];
  'projects2': ProjectScopeBean[];
  global: GlobalScopeBean[];
}
