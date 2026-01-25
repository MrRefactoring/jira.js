import type { ProjectArchetype } from './projectArchetype';
import type { ProjectTemplateKey } from './projectTemplateKey';
import type { CustomTemplateOptions } from './customTemplateOptions';

export interface ProjectTemplateModel {
  archetype?: ProjectArchetype;
  defaultBoardView?: string;
  description?: string;
  liveTemplateProjectIdReference?: number;
  name?: string;
  projectTemplateKey?: ProjectTemplateKey;
  snapshotTemplate?: {};
  templateGenerationOptions?: CustomTemplateOptions;
  type?: 'LIVE' | 'SNAPSHOT' | string;
}
